import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '../redux/store';
import Budget from '../components/BudgetComponent';

const initialState = {};
const store = createStore(initialState);

describe('BudgetComponent', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Budget /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
