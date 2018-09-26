import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions,
} from '../redux/modules/BudgetReducer';
import BudgetListItemComponent from '../components/BudgetListItemComponent';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetListItemComponent);
