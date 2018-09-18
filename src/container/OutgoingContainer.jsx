import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions, getOutgoings} from '../redux/modules/OutgoingReducer';
import OutgoingListComponent from '../components/OutgoingListComponent';

const mapStateToProps = state => ({
    outgoings: getOutgoings(state)
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutgoingListComponent);
