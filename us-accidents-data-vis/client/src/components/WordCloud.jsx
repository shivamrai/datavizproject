import React, { useState, useEffect } from "react";
// import React from 'react';
import ReactDOM from 'react-dom';
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from 're-resizable';
import words from './wordData';
import {connect} from 'react-redux';
import axios from "axios";

const resizeStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

function Wordcloud({ user }) {

  const [data, setData] = useState(words);
  const [localUser, setLocalUser] = useState("");

  if(localUser !== user){

    axios.post(`http://127.0.0.1:5000/wordCloudData/${user}`,{
    }).then((response) => {
      console.log(response.data);
      setData(response.data.result);
      setLocalUser(user);
    });
}

  return (
    <div>
      <span className="label">{user}</span>
      <Resizable
        defaultSize={{
          width: 380,
          height: 315,
        }}
        style={resizeStyle}>
        <div style={{ width: '100%', height: '100%' }}>
          <ReactWordcloud words={data} />
        </div>
      </Resizable>
    </div>
  );
}


const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Wordcloud);