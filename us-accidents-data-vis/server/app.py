from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin

from data.US_states_pop import US_states_population
# from data import cities_count

import os
import json
import pandas as pd
import numpy as np

app = Flask(__name__, instance_relative_config=True)
api = Api(app)
cors = CORS(app, resources={r"/hello": {"origins": "http://localhost:port"}})
test_config = None
# def create_app(test_config=None):
    # create and configure the app

app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'application.sqlite'),
)

if test_config is None:
    # load the instance config, if it exists, when not testing
    app.config.from_pyfile('config.py', silent=True)
else:
    # load the test config if passed in
    app.config.from_mapping(test_config)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

# a simple page that says hello
@app.route('/hello',methods = ['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def hello():
    return 'Hello, World!'

# return app
@app.route('/getUSpopulation',methods = ['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def getUSstatespopulation():
    return US_states_population

@app.route('/getUSCitiesCount/<state>',methods = ['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def getUSCitiesCount(state):
    
    f = open('./data/cities_count.json')
    data = json.load(f)

    # with open("./data/cities_count.json") as test:
    #     d = test.read()

    # data = json.loads(d)

    if state not in data:
        return {'success': False}

    data = data[state]
    
    cities = {}
    top10 = []
    # print(data)
    for county in data:
        for city in data[county]:
            if city not in cities:
                # print('city: ',city,"  & county: ",county)
                cities[city] = data[county][city]
            else:
                cities[city] += data[county][city]
                
        
    # newA = dict(sorted(cities.iteritems(), key=operator.itemgetter(1), reverse=True)[:10])
    newA = sorted(cities, key=cities.get, reverse=True)[:10]
    # print(newA)
    res = []
    # { name: 'Thu', value: 200 },
    # { name: 'Fri', value: 20 },
    for item in newA:
        temp = {}
        # temp = dict(zip(keys, values))
        temp['name'] = item
        temp['value'] = cities[item]
        res.append(temp)
        # res[item] = cities[item]
    #listOfCities = list(map(cities[city],cities[]))

    return {'cities':cities , 'top10':res}


class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

# app = Flask(__name__)

if __name__ == "__main__":
    app.run("0.0.0.0")