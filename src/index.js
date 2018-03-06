import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { loadMyIp } from './actions/dashboardActions';

const store = configureStore();
store.dispatch(loadMyIp()).catch(() => {
  alert('FAIL DURING LOAD :p');
});

render(
  <Provider store={store}>
    <HashRouter><App /></HashRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
