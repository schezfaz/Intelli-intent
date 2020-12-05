import time
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from office365.runtime.auth.authentication_context import AuthenticationContext
from office365.sharepoint.client_context import ClientContext
from office365.sharepoint.files.file import File
import os
from elasticsearch import Elasticsearch
import tensorflow as tf
import numpy as np 
import pandas as pd
import matplotlib.pyplot as plt
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
    labels = ['business','entertainment','politics','sport','tech']
    print(pred, labels[np.argmax(pred)])

    res = getFilesFromElasticsearch(labels[np.argmax(pred)])
    return jsonify(res['hits']['hits'])
    # return {'Winner': labels[np.argmax(pred)]}

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

@app.route('/sharepoint-connect', methods=['GET','POST'])
def connectToSharepoint():

    server_url = "https://spitindia.sharepoint.com"
    site_url = server_url + "/sites/Darshan"
    username = "darshan.patil@spit.ac.in"
    password = ""
    ctx_auth = AuthenticationContext(site_url)
    ctx_auth.acquire_token_for_user(username, password)   
    ctx = ClientContext(site_url, ctx_auth)
    saveFilesToElasticSearch(ctx, server_url)


def saveFilesToElasticSearch(ctx, server_url):
    list_object = ctx.web.lists.get_by_title("Documents")
    folder = list_object.rootFolder        
    ctx.load(folder)
    ctx.execute_query()

    folders = folder.folders
    ctx.load(folders)
    ctx.execute_query()

    # es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
    es = Elasticsearch(
    ["https://elastic:pVtn4OLSorIsWFjY79TIAVYp@6417f52e634543d5b0bef8fb023b0aeb.ap-south-1.aws.elastic-cloud.com:9243"])


    for myfolder in folders:
        if(myfolder.properties["Name"] != 'Forms'):
            print("File name: {0}".format(myfolder.properties["Name"]))
            files = myfolder.files
            #folder_path = os.path.join(download_path, myfolder.properties["Name"])
            #os.mkdir(folder_path)
            ctx.load(files)
            ctx.execute_query()
            index = 1
            for file in files:
                print("File name: {0}".format(file.properties["Name"]))
                print("Downloading file: {0} ...".format(file.properties["ServerRelativeUrl"]))
                download_file_name = file.properties["Name"]
                es.index(index=myfolder.properties["Name"].lower(), doc_type="test-type", id=index, body={"name": download_file_name, "location" : server_url+file.properties["ServerRelativeUrl"]})
                index+= 1

def getFilesFromElasticsearch(intent_predicted):
    #es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
    es = Elasticsearch(
    ["https://elastic:pVtn4OLSorIsWFjY79TIAVYp@6417f52e634543d5b0bef8fb023b0aeb.ap-south-1.aws.elastic-cloud.com:9243"])

    doc = {
        'size' : 20,
        'query': {
            'match_all' : {}
       }
    }
    res = es.search(index=intent_predicted.lower(), doc_type='test-type', body=doc)
    for doc in res['hits']['hits']:
        print(doc['_id'], doc['_source'])
    
    return res


app.run(port=5000, debug=True)