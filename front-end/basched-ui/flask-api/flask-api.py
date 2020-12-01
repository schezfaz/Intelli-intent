import time
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/crawlDir', methods = ['POST'])
def crawlDir():
    dirPath = request.json
    print(dirPath)
    return "done!"
    #     return jsonify(name)
    # return "No player information is given"