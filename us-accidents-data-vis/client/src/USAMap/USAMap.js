import React, { Component } from 'react';
import USAMap from "./react-usa-map";
 
class Usa extends Component {
  /* mandatory */
  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };
 
  render() {
    return (
      <div className="App">
          <p>Tetsing</p>
        <USAMap onClick={this.mapHandler} title = {"Test"} state = {"CA"} customize = {{
      "NJ": {
        fill: "navy"
        // clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
      },
      "NY": {
        fill: "#CC0000"
      }
    }}/>  {/*customize={{"state" : {"fill" : "#0F0F0F"}}}*/}
      </div>
    );
  }
}
 
export default Usa;