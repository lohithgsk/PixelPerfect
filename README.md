# PixelPerfect 📸
> AI-Powered Image Transformation at Your Fingertips

PixelPerfect is a cutting-edge AI-powered image processing application designed to transform your visuals with precision and speed. Built using PyTorch for advanced neural networks, FastAPI for seamless backend integration, and React for a dynamic and responsive user interface, PixelPerfect delivers fast and powerful image enhancements. Whether it's generating captions or summaries or sharpening images, this application offers real-time processing with storage backed by Firebase, ensuring your images are securely stored and easily accessible. PixelPerfect empowers users to achieve high-quality results with minimal effort.


## Image Processing

PixelPerfect leverages a range of powerful AI models to provide an enhanced image processing experience. Using the Gemini API, the app creates image summaries and captions through a Hugging Face model, generating detailed and context-aware descriptions of images. For image enhancement, PixelPerfect implements the ESRGAN (Enhanced Super-Resolution Generative Adversarial Network) model, allowing users to upscale and improve image quality with incredible sharpness and detail retention. Additionally, PixelPerfect uses Stable Diffusion for high-quality image generation, offering users the ability to create stunning visuals from text inputs or modify existing images with AI-driven creativity.

![Architecture](https://github.com/Saminathan-77/Ideathon_2024/blob/main/img/Architecture.jpeg)

## Usage
Install the required packages to run the web application.
```shell
cd client
npm install

cd ..
pip install -r requirements.txt

pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```
Start the application
```shell
uvicorn api:app --reload

cd client
npm run dev
```

## All Our Features

### Home Page
![Home](https://github.com/Saminathan-77/Ideathon_2024/blob/main/img/home.jpeg)

### Login Page
![Login](https://github.com/Saminathan-77/Ideathon_2024/blob/main/img/login.jpeg)

### Upload Page
![Upload](https://github.com/Saminathan-77/Ideathon_2024/blob/main/img/upload.jpeg)

### Enhacing Image
![Enhance](https://github.com/Saminathan-77/Ideathon_2024/blob/main/img/enhance.jpeg)

### Duplicate Image
![Duplicate](https://github.com/Saminathan-77/Ideathon_2024/blob/main/img/duplicate.jpeg)

### Generation Page
![Generate](https://github.com/Saminathan-77/Ideathon_2024/blob/main/img/generate.jpeg)

### Search Page
![Search](https://github.com/Saminathan-77/Ideathon_2024/blob/main/img/search.jpeg)

## Feedback
Please reach out if you find any issues.

