import sys
import torch
import torchaudio
from transformers import Wav2Vec2Model, Wav2Vec2Processor
import os

# Load the model (assume checkpoint is present locally or change path)
MODEL_PATH = "AMAAI-Lab/Music2Emotion"  # Hugging Face model

processor = Wav2Vec2Processor.from_pretrained(MODEL_PATH)
model = Wav2Vec2Model.from_pretrained(MODEL_PATH)

def detect_mood(file_path):
    waveform, sample_rate = torchaudio.load(file_path)

    inputs = processor(waveform, sampling_rate=sample_rate, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
        # Fake logic — replace with actual classification logic
        # Here you can apply a classifier or add logic
        mood = "happy"  # Placeholder
        return mood

if __name__ == "__main__":
    file_path = sys.argv[1]
    print(detect_mood(file_path))
