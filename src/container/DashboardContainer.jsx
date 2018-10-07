import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions as budgetActions, getBudget,
} from '../redux/modules/BudgetReducer';
/* import {
  actions as incomeActions, getIncome,
} from '../redux/modules/IncomeReducer'; */
import {
  actions as outgoingActions, getOutgoings,
} from '../redux/modules/OutgoingReducer';
import DashboardComponent from '../components/DashboardComponent';

const mapStateToProps = state => ({
  budget: getBudget(state),
  /* income: getIncome(state), */
  outgoings: getOutgoings(state),
});

const actions = {
  ...budgetActions,
  /* ...incomeActions, */
  ...outgoingActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
