import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions, getIsBudgetGroupFormOpen, getBudgetGroups,
} from '../redux/modules/BudgetReducer';
import BudgetItemFormComponent from '../components/BudgetItemFormComponent';

const mapStateToProps = state => ({
  open: getIsBudgetGroupFormOpen(state),
  budgetGroups: getBudgetGroups(state),
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetItemFormComponent);
