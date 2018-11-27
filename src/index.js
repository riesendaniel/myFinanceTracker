import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './index.css';
import theme from './theme';
import App from './components/AppComponent';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import { MuiThemeProvider } from '@material-ui/core';

const initialState = {};
this.store = createStore(initialState);

ReactDOM.render(
  <Provider store={this.store}>
    <MuiThemeProvider theme={theme}>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
