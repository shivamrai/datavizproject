import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import PieHooks from "./PieHooks";
import "./styles.css";
import {connect} from 'react-redux';
import stateName from "../data/stateCodes";
import { Button } from "@material-ui/core";
import axios from "axios";

function PieChart({user}) {
  const generateData = (value, length = 2) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));
  const [localUser, setLocalUser] = useState("");

  if(localUser !== user){

    axios.post(`http://127.0.0.1:5000/genderData/${user}`,{
    }).then((response) => {
      console.log(response.data.result);
      console.log(generateData(20));
      setData(response.data.result);
      setLocalUser(user);
    });
}

  // useEffect(() => {
  //   setData(generateData());
  // }, [!data]);

  return (
    <div className="App">
      <div>
        A Pie chart indicating division of drivers in all accidents for state <b>{stateName[user]}</b>
      </div>
      <div><br /></div>
      <div>
        <PieHooks
          data={data}
          width={220}
          height={220}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  // isLoggedIn: False//state.userReducer.isLoggedIn,
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(PieChart);