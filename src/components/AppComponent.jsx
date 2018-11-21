import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth, {
  isWidthUp,
} from '@material-ui/core/withWidth';
import {
  actions,
  getMenuState,
} from '../redux/modules/AppReducer';
import history from '../helper/history';
import Budget from './BudgetComponent';
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
    isSignedIn: false,
    loading: true,
  };

  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isSignedIn: true,
          loading: false,
        });
      } else {
        this.setState({
          isSignedIn: false,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    // un-register Firebase observers when the component unmounts
    this.unregisterAuthObserver();
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
    if (isWidthUp('lg', width) && menuState !== 'open') {
      toggleMenu();
    }
    return (
      <div>
        <Router history={history}>
          {loading ? <Loading /> : (
            <div>
              <header>
                <Header isLoggedIn={isLoggedIn} />
                { (isLoggedIn && menuState === 'open') && <Menu width={menuWidth} /> }
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
  toggleMenu: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  menuState: PropTypes.string.isRequired,
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
};

const AppWithStyles = withStyles(styles)(AppComponent);

const mapStateToProps = state => ({
  menuState: getMenuState(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withWidth()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppWithStyles));
