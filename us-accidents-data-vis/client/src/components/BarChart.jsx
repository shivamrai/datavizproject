import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { render } from 'react-dom';
import { scaleBand, scaleLinear } from 'd3-scale';
import XYAxis from './axis/xy-axis';
import Grid from './grid/grid';
import Bar from './bar/bar';
import { transition } from 'd3-transition';
import {connect} from 'react-redux';
import axios from 'axios';
import stateName from "../data/stateCodes";
import { Typography } from '@material-ui/core';

// const initial_data = [ 
//   { name: 'Sun', value: 100 },
//   { name: 'Mon', value: 50 },
//   { name: 'Tue', value: 500 },
//   { name: 'Wed', value: 300 },
//   { name: 'Thu', value: 200 },
//   { name: 'Fri', value: 20 },
//   { name: 'Sat', value: 50 },
//   { name: 'Thur', value: 200 },
//   { name: 'Frid', value: 70 },
//   { name: 'Satu', value: 40 },
//   ];
const initial_data = [{"name":"Los Angeles","value":65851},{"name":"Sacramento","value":25657},{"name":"San Diego","value":21045},{"name":"San Jose","value":17395},{"name":"Oakland","value":11602},{"name":"Riverside","value":10249},{"name":"Long Beach","value":9743},{"name":"Anaheim","value":8480},{"name":"San Francisco","value":8314},{"name":"Corona","value":7620}];

  const default_top = [];

function BarChart ({user}){
  // let data = [];
  const [state,setState] = React.useState(initial_data);
  const [localUser, setLocalUser] = useState("");

  if(localUser !== user){
    console.log(user);
    axios.get(`http://localhost:5000/getUSCitiesCount/${user}`,{
    }).then((response) => {
      if(user!='USA'){
      setState(response.data.top10);
    console.log(response.data.top10);
      const data = state.map(obj =>({
        name: obj.name,
        value: obj.value
      }))
      console.log(data);
      // setState(data);
      setLocalUser(user);
    }
    });

}


  function randomizeData (e){
    e.preventDefault();
    const data = state.map(obj => ({
      name: obj.name,
      value: Math.floor(Math.random() * 500 + 1)
    }))
    console.log(data);
    setState( data );  
  }

  function populateDefaultData (e){
    e.preventDefault();
    axios.get('http://0.0.0.0:5000/getUSCitiesCount/CA',{
      }).then((response) => {
        setState(response.data.top10);
      console.log(response.data.top10);
        const data = state.map(obj =>({
          name: obj.name,
          value: obj.value
        }))
        console.log(data);
        setState(data);
      });
    //setState(data);
  }
  const data = state;
  //console.log(data);
  const parentWidth = 700;
  const margin = {
      top: 10,
      right: 10,
      bottom: 20,
      left: 40,
    };
    const ticks = 6;
    const t = transition().duration(1000);

    const width = parentWidth - margin.left - margin.right;
    const height = parentWidth * 0.5 - margin.top - margin.bottom;
    console.log(state.map(d => d.name))
    const xScale = scaleBand()
      .domain(state.map(d => d.name))
      .range([0, width])
      .padding(0.26);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data.map(d => d.value))])
      .range([height, 0])
      .nice();
      return(
        <div>
           <div ><Typography variant ="h6">Top 10 cities in {stateName[user]} with most number of accidents.</Typography></div>
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Grid {...{ xScale, yScale, width, ticks, t }} />
            <Bar
              {...{
                xScale,
                yScale,
                data,
                height,
                t,
              }}
            />
          </g>
        </svg>
      </div>
      );
}

const mapStateToProps = state => ({
   // isLoggedIn: False//state.userReducer.isLoggedIn,
   user: state.userReducer.user,
 });
 
 export default connect(mapStateToProps)(BarChart);