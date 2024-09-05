import cv2
import numpy as np
import requests
from skimage.metrics import structural_similarity as ssim
from PIL import Image
import io

class ImageDuplicateChecker:
    def orb_sim(self, img1, img2):
        orb = cv2.ORB_create()
        kp_a, desc_a = orb.detectAndCompute(img1, None)
        kp_b, desc_b = orb.detectAndCompute(img2, None)

        bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        matches = bf.match(desc_a, desc_b)

        matches = sorted(matches, key=lambda x: x.distance)

        similar_regions = [i for i in matches if i.distance < 60]
        if len(matches) == 0:
            return 0
        return len(similar_regions) / len(matches)

    def structural_sim(self, img1, img2):
        img1_gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        img2_gray = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
        score, _ = ssim(img1_gray, img2_gray, full=True)
<<<<<<< HEAD
        return score
=======
        return score

    def check_duplicate(self, upload_file):
        open_cv_image = np.array(upload_file)
        og = open_cv_image[:, :, ::-1].copy()

        collection_ref = self.db.collection("images")
        docs = collection_ref.get()

        max_doc = {}
        max_orb = -100
        max_str = -100

        for doc in docs:
            doc = doc.to_dict()
            response = requests.get(doc['url'])
            image = Image.open(io.BytesIO(response.content)).convert('RGB')
            cv_image = np.array(image)
            image = cv_image[:, :, ::-1].copy()
            image = cv2.resize(image, (og.shape[1], og.shape[0]))

            ORBsim = self.orb_sim(og, image)
            struct_sim = self.structural_sim(og, image)

            if ORBsim > max_orb or struct_sim > max_str:
                max_orb = ORBsim
                max_str = struct_sim

            if max_orb >= 0.8 or max_str >= 0.8:
                max_doc = doc

            if max_doc:
                return max_doc['url']

        return "No duplicates found"
>>>>>>> 419f0b32954d8f731e82e5805f3c3f03ac727180
