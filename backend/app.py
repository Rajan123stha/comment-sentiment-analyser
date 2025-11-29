import re
import googleapiclient.discovery
import joblib
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import pandas as pd
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify
from auth import auth
from models import db
import os
import requests
import logging
from dotenv import load_dotenv
from datetime import datetime
import time
from sentence_transformers import SentenceTransformer
import numpy as np
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# -----------------------------
# Config
# -----------------------------
USE_MOCK_DATA = False
load_dotenv()

youtube_API_key = os.getenv('YOUTUBE_API_KEY')
twitter_bearer_token = os.getenv('TWITTER_BEARER_TOKEN')

if not youtube_API_key or not twitter_bearer_token:
    raise ValueError("API keys missing. Check .env file.")

# Flask init
app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/comment-analyser'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
app.register_blueprint(auth)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(), logging.FileHandler("app.log")]
)

# -----------------------------
# NLTK Setup
# -----------------------------
nltk_data_dir = os.path.expanduser('~') + '/nltk_data'
if not os.path.exists(nltk_data_dir):
    os.makedirs(nltk_data_dir, exist_ok=True)
    nltk.download('stopwords', download_dir=nltk_data_dir)
    nltk.download('wordnet', download_dir=nltk_data_dir)
nltk.data.path.append(nltk_data_dir)

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

# -----------------------------
# Load MiniLM + SVM Model
# -----------------------------
MODEL_DIR = "saved_models"

try:
    clf = joblib.load(os.path.join(MODEL_DIR, "svm_miniLM_calibrated.joblib"))
    meta = joblib.load(os.path.join(MODEL_DIR, "pipeline_meta.joblib"))
    embed_model = SentenceTransformer(meta["embed_model_name"])
    logging.info("MiniLM + SVM sentiment model loaded.")
except Exception as e:
    logging.error(f"Model load failed: {e}")
    raise Exception("Cannot load sentiment model.")

# -----------------------------
# Preprocessing
# -----------------------------
url_pattern = re.compile(r"https?://\S+|www\.\S+")
multi_punct = re.compile(r"([!?.,]){2,}")
multi_space = re.compile(r"\s{2,}")

def preprocess_text(text):
    if pd.isna(text) or not text:
        return ""
    t = str(text)
    t = url_pattern.sub("", t)
    t = t.replace("\n", " ").strip()
    t = multi_punct.sub(r"\1", t)
    t = re.sub(r"(.)\1{3,}", r"\1\1\1", t)
    t = multi_space.sub(" ", t)
    t = t.lower()
    t = re.sub(r'\d+', '', t)
    t = re.sub(r'[^\w\s]', '', t)
    t = ' '.join([lemmatizer.lemmatize(w) for w in t.split() if w not in stop_words])
    return t.strip()

# -----------------------------
# Lexicon Features
# -----------------------------
analyzer = SentimentIntensityAnalyzer()
# Positive emojis
pos_emo = set([
    "😊","😀","😄","😁","😍","👍","🎉","🙂","😃",
    "🥳","🤩","😎","😇","🤗","💖","💛","💚","💙","💜",
    "✨","🌟","🎶","😺","🙌","🤝","💯","😌","😋","🥰","❤️"
])

# Negative emojis
neg_emo = set([
    "😞","😠","😡","😢","😔","👎","😒","😩","😖","😿","😭",
    "😣","😫","😱","😤","😖","😓","🤯","☹️","🙁","💔",
    "😪","😷","🤢","🤮","😨","😬"
])


def emoji_sentiment_score(text):
    return sum(c in pos_emo for c in text) - sum(c in neg_emo for c in text)

def extract_lexicon_features(text):
    vs = analyzer.polarity_scores(text)
    caps_ratio = sum(1 for c in text if c.isupper()) / (len(text)+1)
    return [
        vs["pos"], vs["neg"], vs["neu"], vs["compound"],
        emoji_sentiment_score(text),
        text.count("!"),
        caps_ratio,
        len(text)
    ]

# -----------------------------
# Embeddings + Prediction
# -----------------------------
def embed_texts(texts, batch_size=64):
    out = []
    for i in range(0, len(texts), batch_size):
        emb = embed_model.encode(texts[i:i+batch_size], convert_to_numpy=True, show_progress_bar=False)
        out.append(emb)
    return np.vstack(out)

def predict_comments(comments):
    clean = [preprocess_text(t) for t in comments]

    emb = embed_texts(clean)

    if meta["use_lexicon"]:
        lex_feats = np.array([extract_lexicon_features(t) for t in clean], dtype=float)
        scaler_local = meta["lex_scaler"]
        if scaler_local is not None:
            lex_feats = scaler_local.transform(lex_feats)
        X_all = np.hstack([emb, lex_feats])
    else:
        X_all = emb

    preds = clf.predict(X_all)
    probs = clf.predict_proba(X_all)

    return preds, probs

# -----------------------------
# Safe YouTube Video ID Extractor
# -----------------------------
def extract_video_id(url):
    patterns = [
        r"v=([a-zA-Z0-9_-]{11})",
        r"youtu\.be/([a-zA-Z0-9_-]{11})",
        r"shorts/([a-zA-Z0-9_-]{11})"
    ]
    for p in patterns:
        match = re.search(p, url)
        if match:
            return match.group(1)
    return None

# -----------------------------
# Fetch YouTube Comments
# -----------------------------
def fetch_youtube_comments(video_id, api_key):
    youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=api_key)
    comments = []
    next_page_token = None

    while True:
        req = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=100,
            pageToken=next_page_token
        )
        res = req.execute()

        for item in res["items"]:
            comment = item["snippet"]["topLevelComment"]["snippet"]["textOriginal"]
            comments.append(comment)

        next_page_token = res.get("nextPageToken")
        if not next_page_token:
            break

    return comments

# -----------------------------
# Analyze Comments Route
# -----------------------------
@app.route('/api/comments', methods=['POST'])
def analyze_comments():
    try:
        data = request.json
        video_url = data.get('video_url')

        if not video_url:
            return jsonify({"error": "No video URL provided"}), 400

        video_id = extract_video_id(video_url)
        if not video_id:
            return jsonify({"error": "Invalid YouTube URL"}), 400

        comments = fetch_youtube_comments(video_id, youtube_API_key)

        if not comments:
            return jsonify({"error": "No comments found"}), 404

        preds, probs = predict_comments(comments)

        sentiment_map = {0: "negative", 1: "neutral", 2: "positive"}
        results = []
        for i, comment in enumerate(comments):
            pred_label = sentiment_map[int(preds[i])]  # convert int64 to int then map
            max_prob = float(max(probs[i]))            # convert np.float64 to float
            results.append({
                "comment": comment,                     # original comment
                "sentiment": pred_label,                # textual sentiment
                "confidence": round(max_prob * 100, 2)  # confidence %
    })

        return jsonify(results)

    except Exception as e:
        logging.error(str(e))
        return jsonify({"error": str(e)}), 500

# -----------------------------
# Base
# -----------------------------
@app.route('/')
def index():
    return "API for YouTube Comment Analysis is running."

def get_app():
    return app

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
