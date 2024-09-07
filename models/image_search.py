from google.cloud import firestore
from google.generativeai import configure, GenerativeModel, GenerationConfig
from dotenv import load_dotenv
import os
load_dotenv()

api_key = os.getenv('API_KEY')
configure(api_key=api_key)

class ImageSearcher:
    def __init__(self, db):
        self.db = db

    def check_image(self, user_input):
        collection_ref = self.db.collection("images")
        docs = collection_ref.get()

        summaries = []
        urls = []
        for doc in docs:
            doc_data = doc.to_dict()
            summaries.append(doc_data['summary'])
            urls.append(doc_data['url'])

        generation_config = {
            "temperature": 0.5,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        }

        model = GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
            # safety_settings = Adjust safety settings
            # See https://ai.google.dev/gemini-api/docs/safety-settings
        )
        

        chat_session = model.start_chat(
        history=[
            {
            "role": "user",
            "parts": [
                "Your task is that when you are given a user input and a list of image summaries, identify which images the user is referring to.\n\n            user_input: The input provided by the user describing the images they are referring to.\n            summaries: A list of summaries, each representing a different image.\n\n            Output:\n            A list of booleans [True, False, True, False...] where each element corresponds to whether the user is talking about the image corresponding to that summary, understand the summary well and the user's intent. (True for yes, False for no). \n\n            Your response should only contain this list of booleans, with no additional text or explanation.",
            ],
            },
            {
            "role": "model",
            "parts": [
                "OK, I understand. Please provide me with the `user_input` and the `summaries` list, and I will give you the list of booleans as output. \n",
            ],
            },
        ]
        )
        response = chat_session.send_message(f"user_input = ['{user_input}'], and the summaries: {summaries}")

        found = (response.text).split(', ')
        print(found)
        if "True" not in found:
            return "No matching images found."
        else:
            urllist = []
            x = 0
            for i in range(len(found)):
                if "True" in found[i]:
                    urllist.append(urls[i])

        return urllist
