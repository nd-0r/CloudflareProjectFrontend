import json
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
@cross_origin()
def index():
  return json.dumps([
      {'name': 'Andrew', 'title': 'who doesnt like a good cookie joke', 'content': 'how many cookies does it take to break a browser'},
      {'name': 'Andrew', 'title': 'who doesnt like a good cookie joke', 'content': 'how many cookies does it take to break a browser'},
      {'name': 'Andrew', 'title': 'who doesnt like a good cookie joke', 'content': 'how many cookies does it take to break a browser'},
      {'name': 'Andrew', 'title': 'who doesnt like a good cookie joke', 'content': 'how many cookies does it take to break a browser'},
      {'name': 'Andrew', 'title': 'who doesnt like a good cookie joke', 'content': 'how many cookies does it take to break a browser'},
  ])

@app.route('/', methods=['POST'])
@cross_origin()
def index_post():
    return "SUCCESS"

app.run()
