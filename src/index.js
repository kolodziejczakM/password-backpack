import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

render(
  <HashRouter><App /></HashRouter>,
  document.getElementById('root')
);

registerServiceWorker();
