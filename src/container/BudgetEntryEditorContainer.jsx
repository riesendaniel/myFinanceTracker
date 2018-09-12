import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions, getIsLoading,
} from '../redux/modules/BudgetReducer';
import BudgetEntryEditorComponent from '../components/BudgetEntryEditorComponent';

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetEntryEditorComponent);
