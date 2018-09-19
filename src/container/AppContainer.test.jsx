import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './AppContainer';
import createStore from '../redux/store';

const initialState = {};
this.store = createStore(initialState);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={this.store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
