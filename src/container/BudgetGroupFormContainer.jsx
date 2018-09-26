import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions, getIsBudgetGroupFormOpen,
} from '../redux/modules/BudgetReducer';
import BudgetGroupFormComponent from '../components/BudgetGroupFormComponent';

const mapStateToProps = state => ({
  open: getIsBudgetGroupFormOpen(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetGroupFormComponent);
