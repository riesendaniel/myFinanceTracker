import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { auth } from '../config/firebase';
import { unregisterBudgetWatcher } from '../redux/modules/BudgetReducer';
import { unregisterDeductionsWatcher, unregisterGrossPayWatcher } from '../redux/modules/IncomeReducer';
import { unregisterMainCategoryWatcher } from '../redux/modules/MainCategoryReducer';
import { unregisterOutgoingWatcher } from '../redux/modules/OutgoingReducer';
import { unregisterUsersWatcher, actions } from '../redux/modules/UserReducer';

const unregisterSnapshotWatcher = () => {
  unregisterMainCategoryWatcher();
  unregisterBudgetWatcher();
  unregisterGrossPayWatcher();
  unregisterDeductionsWatcher();
  unregisterOutgoingWatcher();
  unregisterUsersWatcher();
};

class Logout extends Component {
  componentDidMount = () => {
    const { resetCurrentUser } = this.props;
    auth.signOut();
    unregisterSnapshotWatcher();
    resetCurrentUser();
  }

  render = () => null;
}

Logout.propTypes = {
  resetCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
