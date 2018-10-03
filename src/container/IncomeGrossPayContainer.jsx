import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions, getGrossPay,
} from '../redux/modules/IncomeReducer';
import IncomeGrossPayComponent from '../components/IncomeGrossPayComponent';

const mapStateToProps = state => ({
  currency: getCurrency(state),
  grossPay: getGrossPay(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeGrossPayComponent);
