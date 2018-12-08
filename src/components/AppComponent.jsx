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
import { actions as usersActions } from '../redux/modules/UserReducer';
import history from '../helper/history';
import Budget from './BudgetComponent';
import RedirectComponent from './RedirectComponent';
import BudgetItemForm from './BudgetItemFormComponent';
import Dashboard from './DashboardComponent';
import Header from './HeaderComponent';
import Income from './IncomeComponent';
import Loading from './LoadingComponent';
import Menu from './MenuComponent';
import NotFound from './NotFound';
import NewOutgoingComponent from './NewOutgoingComponent';
import OutgoingListComponent from './OutgoingListComponent';
import UserAdministration from './UserAdministrationComponent';
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

  routes = [
    {
      id: 1,
      path: '/budget/edit',
      component: BudgetItemForm,
    },
    {
      id: 2,
      path: '/budget',
      component: Budget,
    },
    {
      id: 3,
      path: '/income',
      component: Income,
    },
    {
      id: 4,
      path: '/outgoings',
      component: OutgoingListComponent,
    },
    {
      id: 5,
      path: '/outgoing/edit',
      component: NewOutgoingComponent,
    },
    {
      id: 6,
      path: '/admin',
      component: UserAdministration,
    },
    {
      id: 7,
      path: '/signin/',
      component: SignIn,
    },
    {
      id: 8,
      path: '/logout/',
      component: Logout,
    },
    {
      id: 9,
      path: '/',
      component: Dashboard,
      exact: true,
    },
    {
      id: 10,
      path: '*',
      component: NotFound,
    },
  ];

  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        this.initializeSnapshotWatcher();
      }
      this.setState({
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    // un-register Firebase observers when the component unmounts
    this.unregisterAuthObserver();
  }

  initializeSnapshotWatcher = () => {
    const {
      initializeMainCategoryWatcher,
      initializeBudgetWatcher,
      initializeGrossPayWatcher,
      initializeDeductionsWatcher,
      initializeOutgoingWatcher,
      initializeUsersWatcher,
    } = this.props;
    initializeMainCategoryWatcher();
    initializeBudgetWatcher();
    initializeGrossPayWatcher();
    initializeDeductionsWatcher();
    initializeOutgoingWatcher();
    initializeUsersWatcher();
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
    const fixedMenu = isWidthUp('lg', width);
    if (fixedMenu && menuState !== 'open') {
      toggleMenu();
    }
    return (
      <div>
        <Router history={history}>
          <div>
            <header>
              <Header isLoggedIn={isLoggedIn} fixedMenu={fixedMenu ? true : undefined} />
              { (isLoggedIn && menuState === 'open') && <Menu width={menuWidth} userName={userName} fixed={fixedMenu ? true : undefined} /> }
              <Notifier />
            </header>
            {loading ? <Loading /> : (
              <div>
                <RedirectComponent />
                <div className={classes.toolbarPlaceholder} />
                <main className={(isLoggedIn && menuState === 'open') ? classes.main : undefined}>
                  <Switch>
                    {this.routes.map(route => (
                      <Route
                        key={route.id}
                        path={route.path}
                        component={route.component}
                        exact={route.exact ? route.exact : undefined}
                      />
                    ))}
                  </Switch>
                </main>
              </div>
            )}
          </div>
        </Router>
      </div>
    );
  }
}

AppComponent.propTypes = {
  initializeBudgetWatcher: PropTypes.func.isRequired,
  initializeDeductionsWatcher: PropTypes.func.isRequired,
  initializeGrossPayWatcher: PropTypes.func.isRequired,
  initializeMainCategoryWatcher: PropTypes.func.isRequired,
  initializeOutgoingWatcher: PropTypes.func.isRequired,
  initializeUsersWatcher: PropTypes.func.isRequired,
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
  ...usersActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withWidth()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppWithStyles));
