import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions, getIsLoading, getGrossPay, getNetPay,
} from '../redux/modules/IncomeReducer';
import IncomeComponent from '../components/IncomeComponent';

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  grossPay: getGrossPay(state),
  netPay: getNetPay(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeComponent);