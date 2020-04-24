import React, {useEffect} from "react";
import { select, selectAll } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";

function renderAxis(ref, props){
  const { scale, orient, ticks } = props;
    const node = ref.current;
    let axis;

    if (orient === "bottom") {
      axis = axisBottom(scale);
    }
    if (orient === "left") {
      axis = axisLeft(scale)
        .ticks(ticks);
    }
    select(node).call(axis);
}
function updateAxis(ref, props) {
  const { scale, orient, ticks, t } = props;

    if (orient === "left") {
      const axis = axisLeft(scale).ticks(ticks); 
      selectAll(`.${orient}`).transition(t).call(axis)
    }
}
export default function Axis (props) {
  const axisRef = React.useRef();
  const { orient, transform } = props;
  useEffect(()=>{
    if(axisRef.current){
      updateAxis(axisRef, props);
    }
    else{
      renderAxis(axisRef, props);
      axisRef.current=true;
    }
  })
  return (
    <g
        ref={axisRef}
        transform={transform}
        className={`${orient} axis`}
    />
  );
}   