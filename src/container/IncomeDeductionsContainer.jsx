import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions, getDeductions, getTotalDeductions,
} from '../redux/modules/IncomeReducer';
import IncomeDeductionsComponent from '../components/IncomeDeductionsComponent';

const mapStateToProps = state => ({
  deductions: getDeductions(state),
  totalDeductions: getTotalDeductions(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeDeductionsComponent);
