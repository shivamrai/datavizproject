import React, { Component } from 'react';
import USAMap from "./react-usa-map";
import data from "./data/states";
import stateCountData from "./data/state_count";
  
class Usa extends Component {
  /* mandatory */
  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  stateInfo(){
      let countArr = {};
    for(let state of Object.keys(data)){
        if(state in stateCountData)
            {data[state].display = data[state].name + " Count: " + stateCountData[state];
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

  
 
  render() {
      this.stateInfo();
    return (
      <div className="App">

        <USAMap onClick={this.mapHandler} width = {400} height = {300} title = {"USA"} state = {"CA"} stateCustomize = {data} customize ={data}/>  {/*customize={{"state" : {"fill" : "#0F0F0F"}}}*/}
      </div>
    );
  }
}
 
export default Usa;


// {{
//     "NJ": {
//       fill: "navy"
//       // clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
//     },
//     "NY": {
//       fill: "rgb(192,192,192)"
//     }
//   }}