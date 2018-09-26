import { combineReducers } from 'redux';
import budget from './modules/BudgetReducer';
import outgoings from './modules/OutgoingReducer';

export default combineReducers({
  budget,
  outgoings,
});
