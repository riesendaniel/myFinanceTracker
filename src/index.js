import React from 'react';
import { render } from 'react-dom'
import 'typeface-roboto';
import './index.css';
import theme from './theme';
import App from './components/AppComponent';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import { MuiThemeProvider } from '@material-ui/core';

const initialState = {};

const store = createStore(initialState)

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
