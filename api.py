from fastapi import FastAPI, UploadFile, File, Form, Response, HTTPException
from google.generativeai import configure, GenerativeModel, GenerationConfig
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware
from torch import autocast
import torch
from diffusers import StableDiffusionPipeline
import requests
import base64
import os
from dotenv import load_dotenv
from io import BytesIO
from models.image_caption import image_captioning_model
from models.image_duplication import ImageDuplicateChecker
from models.image_search import ImageSearcher
import numpy
import cv2

from datetime import datetime
from firebase_admin import credentials, initialize_app, storage
from firebase_admin import firestore


load_dotenv()

api_key = os.getenv('API_KEY')
auth_token = os.getenv('auth_token')
fire_creds = os.getenv('CREDS')
bucket_url = os.getenv("BUCKET")

cred = credentials.Certificate(fire_creds)
initialize_app(cred, {'storageBucket': bucket_url}) 

db = firestore.client()

configure(api_key=api_key)
model = GenerativeModel('gemini-1.5-pro')

app = FastAPI()

def upload_file(upload_file, file_name): # function to upload file into the db and return a url to store in the db
    bucket = storage.bucket()
    blob = bucket.blob(file_name) 
    pil_img = upload_file
    b = io.BytesIO() 
    pil_img.save(b, 'jpeg') 
    pil_img.close() 
    blob.upload_from_string(b.getvalue(), content_type='image/jpeg')
    blob.make_public() 
    return blob.public_url 


def dbstore(summary,url,timestamp,caption): # store image data in the database
    imagedata = {
        'timestamp': timestamp,
        'url': url,
        'summary': summary,
        'caption': caption
    }
    db.collection('images').add(imagedata)

def check_duplicate(upload_file):

    open_cv_image = numpy.array(upload_file)
    # Convert RGB to BGR
    og = open_cv_image[:, :, ::-1].copy()

    collection_ref = db.collection("images")

    docs = collection_ref.get()
    max = {}
    max_orb = float('-inf')
    max_str = float('-inf')
    for doc in docs:
        doc = doc.to_dict()
        response = requests.get(doc['url'])
        image = Image.open(io.BytesIO(response.content)).convert('RGB')
        cv_image = numpy.array(image)
        image = cv_image[:, :, ::-1].copy()
        image = cv2.resize(image, (og.shape[1], og.shape[0]))
        checker = ImageDuplicateChecker()
        ORBsim = checker.orb_sim(og,image)
        struct_sim = checker.structural_sim(og,image)
        if ORBsim > max_orb or struct_sim > max_str:
            max_orb = ORBsim
            max_str = struct_sim

        if max_orb >= 0.8 or max_str >= 0.8:
            max = doc
        
        if max != {}:
            return max['url']
    
    return "No duplicates found"
    

@app.post("/upload_image/")
async def upload_image(file: UploadFile = File(None), url: str = Form(None), summary: str = Form(None), caption: str = Form(None), flags: str = Form('None')):
 
    if file:

        image = Image.open(io.BytesIO(await file.read())).convert('RGB')
    elif url:
        try:
            response = requests.get(url)
            response.raise_for_status()
            image = Image.open(io.BytesIO(response.content)).convert('RGB')
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=400, detail=f"Error downloading image: {e}")
        except IOError:
            raise HTTPException(status_code=400, detail="Invalid image format at URL.")
    else:
        raise HTTPException(status_code=400, detail="Either an image file or a URL must be provided.")
    
    if "force" not in flags:
        duplicatecheck = check_duplicate(image)
        if duplicatecheck != "No duplicates found":
            return {'duplicate found at': duplicatecheck}
    
    timestamp = datetime.now()
    image_timestamp = timestamp.strftime("%m%d%Y%H%M%S")
    
    # Initialize with a database connection
    url = upload_file(image,image_timestamp)
    dbstore(summary,url,timestamp,caption)

    return {"response": "Image uploaded to database successfully"}


@app.post("/find_image/")
async def find_image(prompt: str = Form(None)):

    searcher = ImageSearcher(db, model)

    result = searcher.check_image(prompt)

    return {"response": result}


@app.post("/generate-summary/")
async def generate_summary(file: UploadFile = File(None), url: str = Form(None)):
    if file:
        image = Image.open(io.BytesIO(await file.read()))
    elif url:
        try:
            response = requests.get(url)
            response.raise_for_status()
            image = Image.open(io.BytesIO(response.content))
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=400, detail=f"Error downloading image: {e}")
        except IOError:
            raise HTTPException(status_code=400, detail="Invalid image format at URL.")
    else:
        raise HTTPException(status_code=400, detail="Either an image file or a URL must be provided.")

    generation_config = GenerationConfig(
        temperature=0.7,
        max_output_tokens=200
    )

    prompt = [
        image,
        "Use simpler words and let it be like human written so it will be useful for searching it. Generate a detailed summary of at least 40 words based on this image content. Your response will be stored as a summary of the description of the image. This summary will be used to search and find the image associated with your response."
    ]

    response = model.generate_content(prompt, generation_config=generation_config)

    return {"summary": response.text}

@app.post("/generate-caption/")
async def generate_caption(file: UploadFile = File(None), url: str = Form(None)):
    if file:
        image = Image.open(io.BytesIO(await file.read()))
    elif url:
        try:
            response = requests.get(url)
            response.raise_for_status()
            image = Image.open(io.BytesIO(response.content))
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=400, detail=f"Error downloading image: {e}")
        except IOError:
            raise HTTPException(status_code=400, detail="Invalid image format at URL.")
    else:
        raise HTTPException(status_code=400, detail="Either an image file or a URL must be provided.")

    try:
        caption = image_captioning_model.predict(image)
        return {"caption": caption}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

device = "cuda" if torch.cuda.is_available() else "cpu"
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id, revision="fp16", torch_dtype=torch.float16, use_auth_token=auth_token)
pipe.to(device)

@app.post("/generate-image/")
async def generate_image(prompt: str = Form(...)):
    with autocast(device):
        image = pipe(prompt, guidance_scale=8.5).images[0]

    image.save("testimage.png")
    buffer = BytesIO()
    image.save(buffer, format='PNG')
    imgstr = base64.b64encode(buffer.getvalue()).decode('utf-8')

    return Response(content=imgstr, media_type='image/png')
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
