import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import withWidth, {
  isWidthUp,
} from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  actions as appActions,
  getMenuState,
} from '../redux/modules/AppReducer';
import { actions as budgetActions } from '../redux/modules/BudgetReducer';
import { actions as incomeActions } from '../redux/modules/IncomeReducer';
import { actions as mainCategoryActions } from '../redux/modules/MainCategoryReducer';
import { actions as outgoingActions } from '../redux/modules/OutgoingReducer';
import history from '../helper/history';
import Budget from './BudgetComponent';
import RedirectComponent from './RedirectComponent';
import BudgetItemForm from './BudgetItemFormComponent';
import Dashboard from './DashboardComponent';
import Header from './HeaderComponent';
import Income from './IncomeComponent';
import Loading from './LoadingComponent';
import MainCategoryListComponent from './MainCategoryListComponent';
import Menu from './MenuComponent';
import NotFound from './NotFound';
import NewOutgoingComponent from './NewOutgoingComponent';
import OutgoingListComponent from './OutgoingListComponent';
import Notifier from './Notifier';
import SignIn from './SignIn';
import { auth } from '../config/firebase';
import Logout from './Logout';

const menuWidth = '300px';

const styles = theme => ({
  toolbarPlaceholder: theme.mixins.toolbar,
  main: {
    [theme.breakpoints.up('lg')]: {
      marginRight: menuWidth,
    },
  },
});

class AppComponent extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loading: false,
        });
        this.initializeSnapshotWatcher();
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    // un-register Firebase observers when the component unmounts
    this.unregisterAuthObserver();
  }

  initializeSnapshotWatcher = () => {
    const {
      initializeAppWatcher,
      initializeMainCategoryWatcher,
      initializeBudgetWatcher,
      initializeGrossPayWatcher,
      initializeDeductionsWatcher,
      initializeOutgoingWatcher,
    } = this.props;
    initializeAppWatcher();
    initializeMainCategoryWatcher();
    initializeBudgetWatcher();
    initializeGrossPayWatcher();
    initializeDeductionsWatcher();
    initializeOutgoingWatcher();
  }

  render = () => {
    const {
      loading,
    } = this.state;
    const {
      toggleMenu,
      classes,
      menuState,
      width,
    } = this.props;
    const isLoggedIn = !!auth.currentUser;
    const userName = auth.currentUser ? auth.currentUser.displayName : '';
    if (isWidthUp('lg', width) && menuState !== 'open') {
      toggleMenu();
    }
    return (
      <div>
        <Router history={history}>
          {loading ? <Loading /> : (
            <div>
              <RedirectComponent/>
              <header>
                <Header isLoggedIn={isLoggedIn} />
                { (isLoggedIn && menuState === 'open') && <Menu width={menuWidth} userName={userName} /> }
                <Notifier />
              </header>
              <div className={classes.toolbarPlaceholder} />
              <main className={(isLoggedIn && menuState === 'open') ? classes.main : undefined}>
                <Switch>
                  <Route path="/budget/edit" component={BudgetItemForm} />
                  <Route path="/budget" component={Budget} />
                  <Route path="/income" component={Income} />
                  <Route path="/outgoings" component={OutgoingListComponent} />
                  <Route path="/outgoing/edit" component={NewOutgoingComponent} />
                  <Route path="/maincategories" component={MainCategoryListComponent} />
                  <Route path="/signin/" component={SignIn} />
                  <Route path="/logout/" component={Logout} />
                  <Route path="/" component={Dashboard} exact />
                  <Route path="*" component={NotFound} />
                </Switch>
              </main>
            </div>
          )}
        </Router>
      </div>
    );
  }
}

AppComponent.propTypes = {
  initializeBudgetWatcher: PropTypes.func.isRequired,
  initializeAppWatcher: PropTypes.func.isRequired,
  initializeDeductionsWatcher: PropTypes.func.isRequired,
  initializeGrossPayWatcher: PropTypes.func.isRequired,
  initializeMainCategoryWatcher: PropTypes.func.isRequired,
  initializeOutgoingWatcher: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  classes: CustomPropTypes.classes.isRequired,
  menuState: CustomPropTypes.menuState.isRequired,
  width: CustomPropTypes.breakpoint.isRequired,
};

const AppWithStyles = withStyles(styles)(AppComponent);

const mapStateToProps = state => ({
  menuState: getMenuState(state),
});

const actions = {
  ...appActions,
  ...budgetActions,
  ...incomeActions,
  ...mainCategoryActions,
  ...outgoingActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withWidth()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppWithStyles));
