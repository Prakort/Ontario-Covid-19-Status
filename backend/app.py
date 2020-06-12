import urllib.request
from flask import Flask
app = Flask(__name__)

def fetchData():
  url = 'https://data.ontario.ca/en/api/3/action/datastore_search?resource_id=455fd63b-603d-4608-8216-7d8647f43350&limit=5'  
  fileobj = urllib.request.urlopen(url)
  print (fileobj.read())

@app.route("/")
def hello():
    fetchData()
    return "Hello World!"

if __name__ == "__main__":
  app.run()
