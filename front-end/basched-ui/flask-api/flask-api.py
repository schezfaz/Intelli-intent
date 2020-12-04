import time
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

import tensorflow as tf
import numpy as np 
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import Sequential
from keras.layers import Dense, Embedding, LSTM, SpatialDropout1D
from sklearn.model_selection import train_test_split
from keras.utils.np_utils import to_categorical
from keras.callbacks import EarlyStopping
from keras.layers import Dropout
import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk import word_tokenize
STOPWORDS = set(stopwords.words('english'))

app = Flask(__name__)
CORS(app, support_credentials=True)


df=pd.read_csv("bbc-text.csv")


space = re.compile('[/(){}\[\]\|@,;]')
symbols= re.compile('[^0-9a-z #+_]')
STOPWORDS = set(stopwords.words('english'))

def clean_text(text):
    text = text.lower() # lowercase text
    text = space.sub(' ', text) # replace REPLACE_BY_SPACE_RE symbols by space in text. substitute the matched string in REPLACE_BY_SPACE_RE with space.
    text = symbols.sub('', text) # remove symbols which are in BAD_SYMBOLS_RE from text. substitute the matched string in BAD_SYMBOLS_RE with nothing. 
    text = text.replace('x', '')
    text = ' '.join(word for word in text.split() if word not in STOPWORDS) # remove stopwors from text
    return text

df['text']=df['text'].apply(clean_text)

tokenizer = Tokenizer(num_words=50000, filters='!"#$%&()*+,-./:;<=>?@[\]^_`{|}~', lower=True)
tokenizer.fit_on_texts(df['text'].values)


model1 = tf.keras.models.load_model("bbcLSTM.model")


@app.route('/', methods=['GET'])
def index():  
    return("Hello world")

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/crawlDir', methods = ['GET','POST'])
def crawlDir():
    dirPath = request.json
    print(dirPath)


    new_complaint = [dirPath] #['Also known as the Growth/Share Matrix, this marketing model was conceptualized to help marketers with long-term strategic planning and business growth opportunities by reviewing the portfolio of their products.']
    seq = tokenizer.texts_to_sequences(new_complaint)
    padded = pad_sequences(seq, maxlen=3000)
    pred = model1.predict(padded)
    labels = ['Business','Entertainment','Politics','Sports','Tech']
    print(pred, labels[np.argmax(pred)])


    return {'Winner': labels[np.argmax(pred)]}

@app.route('/bertExtSum', methods=['GET','POST'])
def bertExtSum():

    from summarizer import Summarizer
    model = Summarizer()

    get_para_summary=open('sports_test.txt', encoding="utf8", errors='ignore').read()

    from gensim.parsing.preprocessing import remove_stopwords
    filtered_sentence = remove_stopwords(get_para_summary)
    # print(filtered_sentence)
    
    result = model(filtered_sentence, min_length=20)
    summary = "".join(result)
      
    return(summary)


app.run(port=5000, debug=True)