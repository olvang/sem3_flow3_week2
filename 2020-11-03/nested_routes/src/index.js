import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style2.css';

const info = [
  {
    id: 'rendering',
    title: 'Rendering with React',
    info: 'Add some text here1',
  },
  { id: 'components', title: 'components', info: 'Add some text here2' },
  { id: 'props-v-state', title: 'Props v. State', info: 'Add some text here3' },
  { id: 'test1', title: 'Test 1', info: 'Add some text here4' },
  { id: 'test2', title: 'Test 2', info: 'Add some text here5' },
];

ReactDOM.render(
  <React.StrictMode>
    <App info={info} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
