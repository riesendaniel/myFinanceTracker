import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions,
} from '../redux/modules/AppReducer';
import HeaderComponent from '../components/HeaderComponent';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent);
