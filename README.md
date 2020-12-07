## BaScheD-Bot
An intelligent search engine for classifying the intent of the query. It uses LSTM model trained on the bbc dataset.

#Installation 
After cloning the repo, follow the below step to run the application -

#Frontend

$ cd front-end/basched-ui/src
$ npm install
$ npm start

This should start the react frontend dev server on localhost:3000

#Backend

$ cd back-end/flask-api-backend
$ python -m venv venv/ # create virtual env
$ source venv/bin/activate # activate virtual env
(venv) $ pip install -r requirements.txt 
(venv) $ python flask_api.py

This should start the flask backend dev server on localhost:5000



