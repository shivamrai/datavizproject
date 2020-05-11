import React from "react";
import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import {setUser,
}
 from '../../redux/actions/userActions';

const USAState = (props) => {
  
  const [stroke,setStroke] = React.useState(props.fill);
  // dispatch(setUser(e.target.value));
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();


  if(stroke != "#9ACD32" && props.state == user)
    setStroke("#9ACD32");
  else if(stroke == "#9ACD32" && props.state != user)
    setStroke(props.fill);


  console.log(props.state);
  // debugger;
  return (
    <path d={props.dimensions} fill={stroke} data-name={props.state} className={`${props.state} state`} onClick={e => dispatch(setUser(e.target.dataset.name))}>
      <title>{props.stateName}</title>
    </path>
  );
}

const mapStateToProps = (state, ownProps = {}) => {
  // debugger; 
  return{
  // isLoggedIn: False//state.userReducer.isLoggedIn,
  user: state.userReducer.user,
  props: ownProps,
};
}

export default connect(mapStateToProps)(USAState);

// export default USAState;
