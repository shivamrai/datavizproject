/* eslint no-undef: "off"*/
import React, { Component } from 'react';
import { useState, useEffect } from "react";
import Usam from "./Index";
import data from "./data/states";
import stateCountData from "./data/state_count";
import { connect } from 'react-redux';
import {setUser,}
from '../redux/actions/userActions';
  

  /* mandatory */
  const mapHandler = (event) => {
    console.log("Clicked!");
    // dispatch(setUser(event.target.dataset.name));
    alert(event.target.dataset.name);
  };

  function stateInfo(){
      let countArr = {};
    for(let state of Object.keys(data)){
        if(state in stateCountData)
            {data[state].display = data[state].name + "\n Count: " + stateCountData[state] + " \nCode: " + data[state].abbreviation ;
            countArr[stateCountData[state]] = state;}
        else
        data[state].display = data[state].name + " Count: " + "N/A";
        
    }
    // countArr = Object.keys(countArr).sort();
    console.log(countArr);
    let red = 250;

    for(let val of Object.keys(countArr)){
        data[countArr[val]].fill = `rgb(${red},0,0)`;
        red -= 3;
    }
    
    console.log(data);
  }

  
 
  const Usa = ({props, user, dispatch}) => {
    // dispatch(setUser("Test2"));
      console.log("USAMap in hooks: " + user);
      stateInfo();


    return (
      <div className="App">

        <Usam onClick={(e) => mapHandler(e)} width = {400} height = {300} title = {"USA"} state = {"CA"} stateCustomize = {data} customize ={data}/>
      {/* < Login /> */}
      </div>
    );
  }

  const mapStateToProps = state => ({
    // isLoggedIn: False//state.userReducer.isLoggedIn,
    user: state.userReducer.user,
  });
 
export default connect(mapStateToProps)(Usa);