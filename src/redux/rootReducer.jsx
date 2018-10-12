import { combineReducers } from 'redux';
import app from './modules/AppReducer';
import budget from './modules/BudgetReducer';
import income from './modules/IncomeReducer';
import outgoings from './modules/OutgoingReducer';
import mainCategory from './modules/MainCategoryReducer';

export default combineReducers({
  app,
  budget,
  income,
  outgoings,
  mainCategory,
});
