import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions,
} from '../redux/modules/BudgetReducer';
import BudgetGroupFormComponent from '../components/BudgetGroupFormComponent';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetGroupFormComponent);
