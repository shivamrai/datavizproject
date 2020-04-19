import React from "react";
import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import {setUser,
}
 from '../../redux/actions/userActions';

const USAState = (props) => {
 
  // dispatch(setUser(e.target.value));
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();

  console.log("... "+user);
  // debugger;
  return (
    <path d={props.dimensions} fill={props.fill} data-name={props.state} className={`${props.state} state`} onClick={e => dispatch(setUser(e.target.dataset.name))}>
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
