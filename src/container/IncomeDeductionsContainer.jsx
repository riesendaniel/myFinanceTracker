import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions, getDeductions, getTotalDeductions,
} from '../redux/modules/IncomeReducer';
import IncomeDeductionsComponent from '../components/IncomeDeductionsComponent';

const mapStateToProps = state => ({
  currency: getCurrency(state),
  deductions: getDeductions(state),
  totalDeductions: getTotalDeductions(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeDeductionsComponent);
