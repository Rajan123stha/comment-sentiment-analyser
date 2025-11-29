# train_model.py

import os
import re
import numpy as np
import pandas as pd
from tqdm import tqdm
from sentence_transformers import SentenceTransformer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, classification_report, confusion_matrix
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

tqdm.pandas()

# -------------------------------
# Load Dataset
# -------------------------------
DATA_PATH = "data/Datasets.csv"
df = pd.read_csv(DATA_PATH)

df.rename(columns=lambda x: x.strip().lower(), inplace=True)
if "comment" in df.columns:
    df.rename(columns={"comment": "text"}, inplace=True)
if "text " in df.columns:
    df.rename(columns={"text ": "text"}, inplace=True)
if "sentiment" in df.columns:
    df.rename(columns={"sentiment": "label"}, inplace=True)
if "labels" in df.columns:
    df.rename(columns={"labels": "label"}, inplace=True)

print("Dataset size:", len(df))

# -------------------------------
# Preprocess Text
# -------------------------------
url_pattern = re.compile(r"https?://\S+|www\.\S+")
multi_punct = re.compile(r"([!?.,]){2,}")
multi_space = re.compile(r"\s{2,}")

def preprocess_text(text):
    if pd.isna(text):
        return ""
    t = str(text)
    t = url_pattern.sub("", t)
    t = t.replace("\n", " ").strip()
    t = multi_punct.sub(r"\1", t)
    t = re.sub(r"(.)\1{3,}", r"\1\1\3", t)
    t = multi_space.sub(" ", t)
    return t.strip()

df['text_clean'] = df['text'].progress_apply(preprocess_text)

# -------------------------------
# Lexicon features
# -------------------------------
analyzer = SentimentIntensityAnalyzer()
pos_emo = set(["😊","😀","😄","😁","😍","👍","🎉","🙂","😃"])
neg_emo = set(["😞","😠","😡","😢","😔","👎","😒","😩","😖","😿","😭"])

def emoji_sentiment_score(text):
    pos = sum(ch in pos_emo for ch in text)
    neg = sum(ch in neg_emo for ch in text)
    return pos - neg

def extract_lexicon_features(text):
    vs = analyzer.polarity_scores(text)
    caps_ratio = sum(1 for c in text if c.isupper()) / (len(text) + 1)
    return {
        "vader_pos": vs["pos"],
        "vader_neg": vs["neg"],
        "vader_neu": vs["neu"],
        "vader_compound": vs["compound"],
        "emoji_score": emoji_sentiment_score(text),
        "excl_count": text.count("!"),
        "caps_ratio": caps_ratio,
        "length": len(text)
    }

lex_features = df['text_clean'].progress_apply(lambda t: pd.Series(extract_lexicon_features(t)))
df = pd.concat([df, lex_features], axis=1)

# -------------------------------
# Embeddings
# -------------------------------
EMBED_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
embedder = SentenceTransformer(EMBED_MODEL_NAME)

def embed_texts(texts, batch_size=64):
    out = []
    for i in range(0, len(texts), batch_size):
        emb = embedder.encode(texts[i:i+batch_size], convert_to_numpy=True, show_progress_bar=False)
        out.append(emb)
    return np.vstack(out)

X_emb = embed_texts(df['text_clean'].tolist())
print("Embeddings shape:", X_emb.shape)

# -------------------------------
# Combine Features
# -------------------------------
lex_cols = ["vader_pos","vader_neg","vader_neu","vader_compound",
            "emoji_score","excl_count","caps_ratio","length"]
X_lex = df[lex_cols].fillna(0).values.astype(float)
scaler = StandardScaler()
X_lex_scaled = scaler.fit_transform(X_lex)
X = np.hstack([X_emb, X_lex_scaled])
y = df['label'].values
print("Final feature shape:", X.shape)

# -------------------------------
# Train Model
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

best_clf = None
best_f1 = -1

for C in [0.01, 0.1, 1.0, 5.0, 10.0]:
    print(f"\nTraining with C={C}")
    base_svm = LinearSVC(C=C, max_iter=5000)
    clf = CalibratedClassifierCV(base_svm, cv=3)
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    f1 = f1_score(y_test, y_pred, average="macro")
    print(f"F1 Score = {f1}")

    if f1 > best_f1:
        best_f1 = f1
        best_clf = clf

print("\nBest model trained. Macro F1:", best_f1)

# -------------------------------
# Evaluate
# -------------------------------
y_pred = best_clf.predict(X_test)
cm = confusion_matrix(y_test, y_pred, labels=best_clf.classes_)
plt.figure(figsize=(6,5))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=best_clf.classes_, yticklabels=best_clf.classes_)
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix")
plt.show()

# -------------------------------
# Save models
# -------------------------------
USE_LEXICON = True
OUTPUT_DIR = "models"
os.makedirs(OUTPUT_DIR, exist_ok=True)

joblib.dump(best_clf, os.path.join(OUTPUT_DIR, "svm_miniLM_calibrated.joblib"))
joblib.dump({
    "embed_model_name": EMBED_MODEL_NAME,
    "use_lexicon": USE_LEXICON,
    "lex_scaler": scaler
}, os.path.join(OUTPUT_DIR, "pipeline_meta.joblib"))

print("✅ Models and metadata saved to", OUTPUT_DIR)
