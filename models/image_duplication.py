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
        return score