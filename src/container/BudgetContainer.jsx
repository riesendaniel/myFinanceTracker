import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions, getIsLoading, getBudget, getBudgetGroups,
} from '../redux/modules/BudgetReducer';
import BudgetComponent from '../components/BudgetComponent';

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  budgetGroups: getBudgetGroups(state),
  budget: getBudget(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetComponent);
