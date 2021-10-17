import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import config from './aws-exports';
import './index.css';

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
