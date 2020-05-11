import React from 'react';
import './App.css';
import MainPage from './MainPage';
import Usa from './USAMap/USAMap';
import axios from 'axios';
import { connect } from 'react-redux';

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

  const [store, setStore] = React.useState('');

  return (
    <div className="App">
      <MainPage store={store}/>
      {/* <button onClick={() => apiTest()}> API Test </button> */}
      {/* <Usa /> */}
    </div>  
  );
}

export default connect(null)(App);
