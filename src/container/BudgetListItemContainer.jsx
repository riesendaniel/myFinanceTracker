import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
} from '../redux/modules/BudgetReducer';
import BudgetListItemComponent from '../components/BudgetListItemComponent';

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetListItemComponent);
