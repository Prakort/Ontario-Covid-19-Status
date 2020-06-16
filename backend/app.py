from flask import Flask
from flask_cors import CORS, cross_origin

import pandas as pd
import xmltodict
import json 
import urllib.request
import requests

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
 
confirmed_url = 'https://data.ontario.ca/datastore/dump/455fd63b-603d-4608-8216-7d8647f43350?format=json'
status_url = 'https://data.ontario.ca/datastore/dump/ed270bb8-340b-41f9-a7c6-e8ef587e6d11?format=xml'

def fetchData(url):
  # print("url", url)

  # fileobj = urllib.request.urlopen(url2)
  r = requests.get(url, stream = True)
  # o = xmltodict.parse(r.content)
  # print("r",r.content)

  # b = json.dumps(o)
  # print('json', b)
  # return b
  # json_content = pd.read_csv(r.content)
  # json_content = pd.to_json()
  # print('json', json_content)

  # with open("455fd63b-603d-4608-8216-7d8647f43350.json",'wb') as f: 
  
  #   # Saving received content as a png file in 
  #   # binary format 
  
  #   # write the contents of the response (r.content) 
  #   # to a new file in binary mode. 
  #   f.write(r.content) 
  return r.content

  
def convertXML(data):
  print("data", data)
  parse = xmltodict.parse(data)
  print("eoeoeoeoe")
  return json.dumps(parse)
  

@app.route("/data", methods=['POST'])
@cross_origin()
def hello2():
  try:
    data = fetchData(confirmed_url)
    result = json.loads(data)
    return result
  except:
    return 'Error getting the data'
   

@app.route("/status", methods=['POST'])
@cross_origin()
def status_cases():
  try:
    data = fetchData(status_url)
    return data
  except:
    return 'Error getting the status data'


# @app.route("/")
# @cross_origin()
# def hello():
#   try:
#     data = fetchData()
#     result = json.loads(data)
#     # records = result['result']['records']
#     # print('# of records', len(records))
#     return result
#   except:
#     return 'Error getting the data'
   

if __name__ == "__main__":
  app.run(debug=True)
