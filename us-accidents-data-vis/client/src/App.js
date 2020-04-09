import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './MainPage';
import Usa from './USAMap/USAMap';
import axios from 'axios';

function apiTest(){
      let url = 'http://127.0.0.1:5000/hello';

      axios.get(url)
      .then(res => {
        console.log('Worked: ',res.data);
         
      })
      .catch(err => {
        console.log('Error: ',err);
      });
}


function App() {
  return (
    <div className="App">
      <MainPage />
      <button onClick={() => apiTest()}> API Test </button>
      {/* <Usa /> */}
    </div>  
  );
}

export default App;
