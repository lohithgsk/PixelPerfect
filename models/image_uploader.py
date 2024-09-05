import io
from google.cloud import storage
from PIL import Image

class ImageUploader:
    def __init__(self, db):
        self.db = db
        self.storage_client = storage.Client()

    def upload_file(self, upload_file, file_name):
        """
        Uploads a file to the storage bucket and returns a public URL.
        """
        bucket = self.storage_client.bucket()
        blob = bucket.blob(file_name)

        # Convert the PIL image to bytes
        b = io.BytesIO()
        upload_file.save(b, 'jpeg')
        upload_file.close()

        # Upload the image bytes to the storage bucket
        blob.upload_from_string(b.getvalue(), content_type='image/jpeg')
        blob.make_public()

        return blob.public_url

    def dbstore(self, summary, url, timestamp, caption):
        """
        Stores image data in the database.
        """
        imagedata = {
            'timestamp': timestamp,
            'url': url,
            'summary': summary,
            'caption': caption
        }
        self.db.collection('images').add(imagedata)
