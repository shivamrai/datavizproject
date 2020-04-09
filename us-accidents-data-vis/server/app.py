from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin

import os

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


class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

# app = Flask(__name__)

if __name__ == "__main__":
    app.run("0.0.0.0")