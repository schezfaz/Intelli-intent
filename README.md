
# Intelli-intent

An intelligent search engine for classifying the intent of the query. It uses LSTM model trained on the bbc news dataset http://mlg.ucd.ie/datasets/bbc.html. It fetches the data directory from Sharepoint. It is developed by using React, Flask, and ElasticSearch.

# Installation 

After cloning the repo, follow the below steps to run the application -

# Frontend

$ cd front-end/basched-ui/src <br />
$ npm install <br />
$ npm start <br />

This should start the react frontend dev server on localhost:3000

# Backend

$ cd back-end/flask-api-backend <br />
$ python -m venv venv/ # create virtual env <br />
$ source venv/bin/activate # activate virtual env <br />
(venv) $ pip install -r requirements.txt <br />
(venv) $ python flask_api.py <br />

This should start the flask backend dev server on localhost:5000

# ElasticSearch

It is used for storing the data of the files and searching the query.


