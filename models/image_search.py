from google.cloud import firestore
from google.generativeai import configure, GenerativeModel, GenerationConfig
from dotenv import load_dotenv
import os
load_dotenv()

api_key = os.getenv('API_KEY')
configure(api_key=api_key)
model = GenerativeModel('gemini-1.5-flash')

class ImageSearcher:
    def __init__(self, db):
        self.db = db

    def check_image(self, user_input):
        generation_config = GenerationConfig(
            temperature=0.7,
            max_output_tokens=20
        )

        collection_ref = self.db.collection("images")
        docs = collection_ref.get()

        summaries = []
        urls = []
        for doc in docs:
            doc_data = doc.to_dict()
            summaries.append(doc_data['summary'])
            urls.append(doc_data['url'])

        prompt = [
            f"I'm giving you a list of summaries for images, as well as an input by the user. Determine which image the user is talking about. Input = {user_input}, Summary = {summaries}. Your response should be True or False, and the summary number from the list of summaries I gave you, depending on whether the user is talking about that image or not."        ]
        print(user_input)
        response = model.generate_content(prompt, generation_config=generation_config)
        print(response)

        found = (response.text).split(', ')
        index = int(found[1][0])

        if found[0] == 'True':
            return [urls[int(index)]]
        else:
            return "No matching images found."
