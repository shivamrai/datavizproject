# us-accidents-data-vis
Data Visualization for US Accidents from 2016 to 2019

## How to run the app:

- Git clone the repo
- Create virtual env using this reference [venv](https://flask.palletsprojects.com/en/1.1.x/installation/#virtual-environments)
- Activate the env and install flask by running this command - **'pip install Flask'**
- Run the application from 'app.py' file through python 3.x
- Visit (http://127.0.0.1:5000/hello) to see the **Hello, World!** output

## APIs (GET):

-(http://127.0.0.1:5000/getUSCitiesCount/{state}) where {state} is State Abbreviation like "CA" for California.
- Response: All cities and top 10 cities
