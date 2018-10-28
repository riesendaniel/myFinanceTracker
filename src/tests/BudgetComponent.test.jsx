import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BottomNavigation } from '@material-ui/core';
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
    };
    const props = {
      doLoadBudget: jest.fn(),
      doLoadMainCategories: jest.fn(),
      history: { push: jest.fn() },
      isLoading: false,
      mainCategories: [
        {
          id: 2,
          description: 'Haushalt',
          color: '#FF9900',
        },
        {
          id: 5,
          description: 'Reisen',
          color: '#00FF00',
        },
      ],
      budget: [
        {
          id: 1,
          mainCategoryId: 2,
          category: 'Unterhalt',
          period: 'monthly',
          monthly: 100,
          yearly: 1200,
        },
        {
          id: 2,
          mainCategoryId: 2,
          category: 'Essen & Getränke',
          period: 'monthly',
          monthly: 250,
          yearly: 3000,
        },
        {
          id: 3,
          mainCategoryId: 5,
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

  it('should render the bottom navigation', () => {
    expect(wrapper.find(BottomNavigation).exists()).toBe(true);
  });
});
