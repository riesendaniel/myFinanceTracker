import { combineReducers } from 'redux';
import app from './modules/AppReducer';
import budget from './modules/BudgetReducer';
import outgoings from './modules/OutgoingReducer';

export default combineReducers({
  app,
  budget,
  outgoings,
});
