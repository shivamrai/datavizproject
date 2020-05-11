import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import PieHooks from "./PieHooks";
import "./styles.css";
import {connect} from 'react-redux';
import stateName from "../data/stateCodes";
import { Button } from "@material-ui/core";

function PieChart({user}) {
  const generateData = (value, length = 2) =>
    d3.range(length).map((item, index) => ({
      gender: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));
  const changeData = () => {
    setData(generateData());
    console.log(data);  
  };

  useEffect(() => {
    setData(generateData());
  }, [!data]);

  return (
    <div className="App">
      <div>
        A Pie chart indicating division of drivers in all accidents for state <b>{user}</b>
      </div>
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