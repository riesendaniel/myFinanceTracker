import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  actions, getMenuState,
} from '../redux/modules/AppReducer';
import AppComponent from '../components/AppComponent';

const mapStateToProps = state => ({
  menuState: getMenuState(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);
