import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions as budgetActions, getIsLoading, getBudget,
} from '../redux/modules/BudgetReducer';
import DashboardComponent from '../components/DashboardComponent';

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  budget: getBudget(state),
});

const actions = {
  ...budgetActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
