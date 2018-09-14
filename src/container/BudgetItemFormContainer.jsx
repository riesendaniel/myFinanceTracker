import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions, getIsLoading, getBudgetGroups,
} from '../redux/modules/BudgetReducer';
import BudgetItemFormComponent from '../components/BudgetItemFormComponent';

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  budgetGroups: getBudgetGroups(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetItemFormComponent);
