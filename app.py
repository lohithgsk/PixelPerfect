from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from google.generativeai import configure, GenerativeModel, GenerationConfig
from PIL import Image
import io
import requests
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('API_KEY')

configure(api_key=api_key)
model = GenerativeModel('gemini-1.5-pro')

app = FastAPI()

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
