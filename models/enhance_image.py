from fastapi import UploadFile, HTTPException
from fastapi.responses import Response
from PIL import Image
import io
import numpy as np
import cv2
from io import BytesIO

async def enhance_image(file: UploadFile = None):
    if not file:
        raise HTTPException(status_code=400, detail="No image file provided.")

    image = Image.open(io.BytesIO(await file.read()))
    open_cv_image = np.array(image)

    gaussian_blur = cv2.GaussianBlur(open_cv_image, (7, 7), 2)
    sharpened2 = cv2.addWeighted(open_cv_image, 3.5, gaussian_blur, -2.5, 0)

    sharpened2_pil = Image.fromarray(sharpened2)
    buffer = BytesIO()
    sharpened2_pil.save(buffer, format='PNG')
    buffer.seek(0)

    return Response(content=buffer.getvalue(), media_type='image/png')