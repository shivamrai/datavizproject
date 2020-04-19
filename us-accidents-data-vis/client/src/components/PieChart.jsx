import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import PieHooks from "./PieHooks";
import "./styles.css";
import {connect} from 'react-redux';

function PieChart({user}) {
  const generateData = (value, length = 2) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));
  const changeData = () => {
    setData(generateData());
  };

  useEffect(() => {
    setData(generateData());
  }, [!data]);

  return (
    <div className="App">
      <div>
        <button onClick={changeData}>Transform</button>
      </div>
      <div>
  <span className="label">{user}</span>
        <PieHooks
          data={data}
          width={200}
          height={200}
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