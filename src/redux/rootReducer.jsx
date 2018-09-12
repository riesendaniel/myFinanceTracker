import { combineReducers } from 'redux';
import budget from './modules/BudgetReducer';
import reducerOne from './modules/OutgoingReducer';

export default combineReducers({
  budget,
  reducerOne,
});
