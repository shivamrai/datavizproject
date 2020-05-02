import React from 'react';
import ReactDOM from 'react-dom';
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from 're-resizable';
import words from './data';

const resizeStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

export default function Wordcloud() {
  return (
    <div>
      <Resizable
        defaultSize={{
          width: 500,
          height: 300,
        }}
        style={resizeStyle}>
        <div style={{ width: '100%', height: '100%' }}>
          <ReactWordcloud words={words} />
        </div>
      </Resizable>
    </div>
  );
}
