import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions,
} from '../redux/modules/IncomeReducer';
import IncomeDeductionsItemComponent from '../components/IncomeDeductionsItemComponent';

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeDeductionsItemComponent);
