from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask import request

from data.US_states_pop import US_states_population
# from data import cities_count

import os
import json
import ast
# import pandas as pd
# import numpy as np

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

    if state not in data:
        return {'success': False}

    data = data[state]
    
    cities = {}
    for county in data:
        for city in data[county]:
            if city not in cities:
                cities[city] = data[county][city]
            else:
                cities[city] += data[county][city]
                
    newA = sorted(cities, key=cities.get, reverse=True)[:10]
    res = []
    for item in newA:
        temp = {}
        temp['name'] = item
        temp['value'] = cities[item]
        res.append(temp)

    return {'cities':cities , 'top10':res}


@app.route('/wordCloudData/<state>',methods = ['GET','POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def getWordCloudData(state):
    
    if state == "USA":
        f = open('./data/Weather_Condition.json')
        weather_data = json.load(f)
        res = []

        for k,v in weather_data.items():
            temp = {}
            temp['text'] = k
            temp['value'] = v
            res.append(temp)
        return {'result' : res}
    
    f = open('./data/US_States_All_Causes.json')
    weather_data = json.load(f)
    if state in weather_data:
        res = weather_data[state]
        return {'result' : res}
    
    return {'result' : False}


@app.route('/timeSeriesData/<state>',methods = ['GET','POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def getTimeSeriesData(state):
    
    data = {}
    if request.method == 'POST':
        data = request.data
        data = ast.literal_eval(data.decode("UTF-8"))
        data = data["data"]

    f = open('./data/timeseries3.json')
    timeseries_data = json.load(f)

    if state == "USA":
        return {"result" : timeseries_data["CA"]}

    return {"result" : timeseries_data[state]}

@app.route('/stateStats/<state>',methods = ['GET','POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def getStateStats(state):
    f = open('./data/state_stats.json')
    stats_data = json.load(f)

    if state == "USA":
        return {"result" : stats_data["CA"]}

    return {"result" : stats_data[state]}

@app.route('/genderData/<state>',methods = ['GET','POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def getGenderStats(state):
    f = open('./data/state_gender.json')
    stats_data = json.load(f)
    if state in stats_data:
        return {"result" : stats_data[state]}
    
    return {"result" : False}


class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

# app = Flask(__name__)

if __name__ == "__main__":
    app.run("0.0.0.0")