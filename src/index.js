import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.css';
import App from './container/AppContainer';
import { Provider } from 'react-redux';
import createStore from './redux/store';

const initialState = {};
this.store = createStore(initialState);

ReactDOM.render(
  <Provider store={this.store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
