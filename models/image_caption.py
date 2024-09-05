from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
import torch
from PIL import Image

class ImageCaptioningModel:
    def __init__(self, model_name="nlpconnect/vit-gpt2-image-captioning"):
        self.model = VisionEncoderDecoderModel.from_pretrained(model_name)
        self.feature_extractor = ViTImageProcessor.from_pretrained(model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)

    def predict(self, image):
        if image.mode != 'RGB':
            image = image.convert(mode="RGB")

        pixel_values = self.feature_extractor(images=image, return_tensors='pt').pixel_values
        pixel_values = pixel_values.to(self.device)

        output_ids = self.model.generate(pixel_values, **self.gen_kwargs)
        preds = self.tokenizer.batch_decode(output_ids, skip_special_tokens=True)
        return preds[0].strip()

    def load(self):
        self.gen_kwargs = {"max_length": 16, "num_beams": 4}

image_captioning_model = ImageCaptioningModel()
image_captioning_model.load()