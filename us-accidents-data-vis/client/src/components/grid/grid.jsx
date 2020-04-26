import React, {useEffect} from 'react';
import { axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

const gridlines = ({ yScale, width, ticks }) => axisLeft(yScale)
  .ticks(ticks)
  .tickSize(-width)
  .tickFormat('');
 
 function renderAxis(gridRef, props) {
    const node = gridRef.current;
    select(node).call(gridlines(props));
  }
  function updateAxis(gridRef, props) {
    const node = gridRef.current;
    const { t } = props;
    select('.grid-group').transition(t).call(gridlines(props))
  }
export default function Grid (props){
  const gridRef = React.useRef(); 
  //const[ref, useRef] = React.createRef();
  useEffect(()=>{
    if(gridRef.current){
      updateAxis(gridRef, props);
    }
    else{
      renderAxis(gridRef, props);
      gridRef.current=true;
    }
  })

  return(
    <g
        ref={gridRef}
        className="grid-group"
      />
  );
}