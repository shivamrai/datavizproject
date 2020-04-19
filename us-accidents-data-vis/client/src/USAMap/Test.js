/* eslint no-undef: "off"*/
import React, { Component } from 'react';
import { useState, useEffect } from "react";
// import Usam from "./Index";
import Login from "./Test";
import data1 from "./data/states";
import data from "./data/usa-map-dimensions";
import USAState from "./components/USAState";
import stateCountData from "./data/state_count";
import { connect } from 'react-redux';
import {setUser,}
from '../redux/actions/userActions';
  

  /* mandatory */
  const mapHandler = (event) => {
    console.log("Clicked!" + {user});
    // dispatch(setUser(event.target.dataset.name));
    alert(event.target.dataset.name);
  };

  function stateInfo(){
      let countArr = {};
    for(let state of Object.keys(data1)){
        if(state in stateCountData)
            {data1[state].display = data1[state].name + " Count: " + stateCountData[state];
            countArr[stateCountData[state]] = state;}
        else
        data1[state].display = data1[state].name + " Count: " + "N/A";
        
    }
    // countArr = Object.keys(countArr).sort();
    console.log(countArr);
    let red = 250;

    for(let val of Object.keys(countArr)){
        data1[countArr[val]].fill = `rgb(${red},0,0)`;
        red -= 3;
    }
    
    console.log(data1);
  }

  
 
  const Usat = ({props, user, dispatch}) => {
    dispatch(setUser("Test2"));
      console.log("USAMap in Test: " + user);
      stateInfo();


    return (
      <div className="App">

        {/* <Usam onClick={(e) => mapHandler(e)} width = {400} height = {300} title = {"USA"} state = {"CA"} stateCustomize = {data} customize ={data}/>  customize={{"state" : {"fill" : "#0F0F0F"}}} */}
      {/* < Login /> */}
      </div>
    );
  }

  let props={  onClick: () => {},
  width: 959,
  height: 593,
  defaultFill: "#D3D3D3",
  title: "Blank US states map", 
  customize: {},
  stateCustomize: {},
}

  function clickHandler  (stateAbbreviation) {
    props.onClick(stateAbbreviation);
  };
  
  function fillStateColor (state) {
    if (props.customize && props.customize[state] && props.customize[state].fill) {
      return props.customize[state].fill;
    }
  
    return props.defaultFill;
  };
  
  function stateClickHandler (state) {
    if (props.customize && props.customize[state] && props.customize[state].clickHandler) {
      return props.customize[state].clickHandler
      
    }
    return clickHandler;
  }
  
  function buildPaths () {
    let paths = [];
    for (let stateKey in data) {
      // const path = <USAState key={stateKey} stateName={data[stateKey].name} dimensions={data[stateKey]["dimensions"]} state={stateKey} fill={fillStateColor(stateKey)} onClickState={stateClickHandler(stateKey)} />
      const path = <USAState key={stateKey} stateName={"props.stateCustomize[stateKey].display"} dimensions={data[stateKey]["dimensions"]} state={stateKey} fill={fillStateColor(stateKey)} onClickState={stateClickHandler(stateKey)} />
      paths.push(path);
    };
    return paths;
  };

  const Usam = ({user, dispatch}) => {
      debugger;
    console.log("US index: " + user);

      // const [width, setWidth] = React.useState(959);
      // const [height, setHeight] = React.useState(593);
      // const [defaultFill, setDefaultFill] = React.useState("D3D3D3");
      // const [height, setHeight] = React.useState(593);
      // const [height, setHeight] = React.useState(593);
      // const [height, setHeight] = React.useState(593);
      // const [height, setHeight] = React.useState(593);
    
      // const { user } = props;
    
        return (
          <svg className="us-state-map" xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 959 593">
            <title>{props.title}</title>
            <g className="outlines">
              {buildPaths()}
              <g className="DC state">
                <path className="DC1" fill={fillStateColor("DC1")} d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z" />
                <circle className="DC2" onClick={clickHandler} data-name={"DC"} fill={fillStateColor("DC2")} stroke="#FFFFFF" strokeWidth="1.5" cx="801.3" cy="251.8" r="5" opacity="1" />
              </g>
            </g>
          </svg>
        );
    }

  const mapStateToProps = state => ({
    // isLoggedIn: False//state.userReducer.isLoggedIn,
    user: state.userReducer.user,
  });
 
export default connect(mapStateToProps)(Usam);