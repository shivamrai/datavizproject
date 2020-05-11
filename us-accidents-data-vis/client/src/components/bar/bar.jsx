import React,{useEffect} from 'react';
import { select, event } from 'd3-selection';

export default function Bar (props,ref){
const barRef = React.useRef();
function barTransition(){
  const node = barRef.current;
  console.log(barRef.current);
  const { yScale, height, data, t } = props;
  console.log(data);
  select(node)
    .selectAll('.bar')
    .data(data)
    .transition(t)
    .attr('y', d => yScale(d.value))
    .attr('height', d => height - yScale(d.value));
}
function init () {
  console.log(props);
  const {  xScale,
    yScale,
    data,
    height,
    t,} = props;
  const node = barRef.current;
  console.log(data);
  // prepare initial data from where transition starts.
  const initialData = data.map(obj => ({
    name: obj.name,
    value: obj.value
  }));

  // prepare the field
  const bar = select(node)
    .selectAll('.bar')
    .data(initialData);

  // add rect to svg
  bar
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.name))
    .attr('y', height)
    .attr('width', xScale.bandwidth())

  // first initialization
  barTransition();
  }

  useEffect(()=>{
    if(barRef.current === null){
      barRef.current = true;
      barTransition();
    }
    else {
      init();
    }
  })
  console.log(barRef);
  return(
    <g
        className="bar-group"
        ref={barRef}
      />
  );
}