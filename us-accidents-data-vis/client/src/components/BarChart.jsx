import React, { Component } from 'react';
import { render } from 'react-dom';
import { scaleBand, scaleLinear } from 'd3-scale';
import XYAxis from './axis/xy-axis';
import Grid from './grid/grid';
import Bar from './bar/bar';
import { transition } from 'd3-transition';

const initial_data = [ 
  { name: 'Sun', value: 100 },
  { name: 'Mon', value: 50 },
  { name: 'Tue', value: 500 },
  { name: 'Wed', value: 300 },
  { name: 'Thu', value: 200 },
  { name: 'Fri', value: 20 },
  ];

export default function BarChart (){
  // let data = [];
  const [state,setState] = React.useState(initial_data);
  
  function randomizeData (e){
    e.preventDefault();
    const data = state.map(obj => ({
      name: obj.name,
      value: Math.floor(Math.random() * 500 + 1)
    }))
    console.log(data);
    setState( data );  
  }
  const data = state;
  console.log(data);
  const parentWidth = 500;
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

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.26);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data.map(d => d.value))])
      .range([height, 0])
      .nice();
console.log(yScale);
      return(
        <div>
        <button
          onClick={(e) => randomizeData(e)}
        >
          Randomize data
        </button>
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Grid {...{ xScale, yScale, width, ticks, t }} />
            console.log(data);
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

