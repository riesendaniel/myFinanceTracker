import { combineReducers } from 'redux';
import budgetReducer from './modules/BudgetReducer';
import outgoingReducer from './modules/OutgoingReducer';

export default combineReducers({
  budgetReducer,
  outgoingReducer,
});
