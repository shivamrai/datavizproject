/* eslint no-undef: "off"*/
import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import data from "./data/usa-map-dimensions";
import USAState from "./components/USAState";
import { connect } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import {setUser,} from '../redux/actions/userActions';



const Usam = (props) => {

  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();

// const props={  onClick: () => {},
//   width: 959,
//   height: 593,
//   defaultFill: "#D3D3D3",
//   title: "Blank US states map", 
//   customize: {},
//   stateCustomize: {},
// }
  // const [width, setWidth] = React.useState(959);
  // const [height, setHeight] = React.useState(593);
  // const [defaultFill, setDefaultFill] = React.useState("D3D3D3");
  // const [height, setHeight] = React.useState(593);
  // const [height, setHeight] = React.useState(593);
  // const [height, setHeight] = React.useState(593);
  // const [height, setHeight] = React.useState(593);

  const clickHandler = (stateAbbreviation) => {
    props.onClick(stateAbbreviation);
  };
  
  const fillStateColor = (state) => {
    if (props.customize && props.customize[state] && props.customize[state].fill) {
      return props.customize[state].fill;
    }
  
    return props.defaultFill;
  };
  
  const stateClickHandler = (state) => {
    if (props.customize && props.customize[state] && props.customize[state].clickHandler) {
      return props.customize[state].clickHandler
      
    }
    return clickHandler;
  }
  
  const buildPaths = () => {
    let paths = [];
    for (let stateKey in data) {
      // const path = <USAState key={stateKey} stateName={data[stateKey].name} dimensions={data[stateKey]["dimensions"]} state={stateKey} fill={fillStateColor(stateKey)} onClickState={stateClickHandler(stateKey)} />
      const path = <USAState key={stateKey} stateName={props.stateCustomize[stateKey].display} dimensions={data[stateKey]["dimensions"]} state={stateKey} fill={fillStateColor(stateKey)} onClickState={stateClickHandler(stateKey)} />
      paths.push(path);
    };
    return paths;
  };

  // const { user } = props;
  console.log("US index: "+ user);

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

// USAMap.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   width: PropTypes.number,
//   height: PropTypes.number,
//   title: PropTypes.string,
//   defaultFill: PropTypes.string,
//   customize: PropTypes.object,
//   stateCustomize: PropTypes.string,
// };

// USAMap.defaultProps = {
//   onClick: () => {},
//   width: 959,
//   height: 593,
//   defaultFill: "#D3D3D3",
//   title: "Blank US states map",
//   customize: {},
//   stateCustomize: {},
// };

// export default USAMap;
const mapStateToProps = state => {
  // this maps react props to redux state
  // debugger;
  console.log("State: "+state);
  return{
    user: state.userReducer.user,
    // password: state.userReducer.password,
    // isLoggedIn: state.userReducer.isLoggedIn,
    // loadingState: state.userReducer.loadingState,
  };
};

export default connect(mapStateToProps)(Usam);

// export default connect(null)(USAMap);
