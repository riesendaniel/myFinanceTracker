import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions, getOutgoings} from '../redux/modules/OutgoingReducer';
import OutgoingComponent from './../components/OutgoingComponent';

const mapStateToProps = state => ({
    outgoings: getOutgoings(state)
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutgoingComponent);
