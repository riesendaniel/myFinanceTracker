import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Fab } from '@material-ui/core';
import { BudgetComponent } from '../components/BudgetComponent';
import BudgetList from '../components/BudgetListComponent';
import BudgetSummary from '../components/BudgetSummaryComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('BudgetComponent', () => {
  let wrapper;

  beforeEach(() => {
    const initialState = {
      isLoading: false,
      categories: [],
      budget: [],
      monthlyBudgetSum: null,
    };
    const props = {
      history: { push: jest.fn() },
      classes: {},
      isLoadingBudget: false,
      isLoadingMainCategory: false,
      mainCategories: [
        {
          id: 'test2',
          description: 'Haushalt',
          color: '#FF9900',
        },
        {
          id: 'test5',
          description: 'Reisen',
          color: '#00FF00',
        },
      ],
      budget: [
        {
          id: 'test1',
          mainCategoryId: 'test2',
          category: 'Unterhalt',
          period: 'monthly',
          monthly: 100,
          yearly: 1200,
        },
        {
          id: 'test2',
          mainCategoryId: 'test2',
          category: 'Essen & Getränke',
          period: 'monthly',
          monthly: 250,
          yearly: 3000,
        },
        {
          id: 'test3',
          mainCategoryId: 'test5',
          category: 'öffentlicher Verkehr',
          period: 'yearly',
          monthly: 200,
          yearly: 2400,
        },
      ],
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    wrapper = shallow(<BudgetComponent store={store} {...props} />);
  });

  it('should render the plain component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the budget list component', () => {
    expect(wrapper.find(BudgetList)).toHaveLength(2);
  });

  it('should render the budget summary', () => {
    expect(wrapper.find(BudgetSummary).exists()).toBe(true);
  });

  it('should render the fab button', () => {
    expect(wrapper.find(Fab).exists()).toBe(true);
  });
});
