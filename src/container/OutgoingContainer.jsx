import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions, getOutgoings, getIsLoading} from '../redux/modules/OutgoingReducer';
import OutgoingListComponent from '../components/OutgoingListComponent';

const mapStateToProps = state => ({
    isLoading: getIsLoading(state),
    outgoings: getOutgoings(state)
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutgoingListComponent);
