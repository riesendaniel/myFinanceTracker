import React, { Component } from "react";
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  actions,
  getMenuState,
} from '../redux/modules/AppReducer';
import { CircularProgress } from "@material-ui/core";
import history from '../helper/history';
import Budget from './BudgetComponent';
import BudgetItemForm from './BudgetItemFormComponent';
import Header from './HeaderComponent';
import Income from './IncomeComponent';
import MainCategoryListComponent from './MainCategoryListComponent';
import Menu from './MenuComponent';
import NotFound from './NotFound';
import NewOutgoingComponent from './NewOutgoingComponent';
import OutgoingListComponent from './OutgoingListComponent';
import Notifier from './Notifier';
import SignIn from './SignIn';
import { auth } from '../config/firebase';
import DashboardComponent from './DashboardComponent';

const menuWidth = '300px';

const styles = theme => ({
  toolbarPlaceholder: theme.mixins.toolbar,
  main: {
    [theme.breakpoints.up('lg')]: {
      marginRight: menuWidth,
    },
  },
  circularProgressWrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: `${theme.spacing.unit * 8}px`
  },
});

class AppComponent extends Component {

  state = {
    isSignedIn: false,
    loading: true
  };


  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isSignedIn: true,
          loading: false
        });
      } else {
        this.setState({
          isSignedIn: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    // un-register Firebase observers when the component unmounts
    this.unregisterAuthObserver();
  }


  render() {
    const { classes, menuState } = this.props;

    const isLoggedIn = !!auth.currentUser;

    return (
      <div className="App">

        <Router history={history}>
          {this.state.loading ? (
            <div className={classes.circularProgressWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <div>
              <header>
                <Header isLoggedIn={isLoggedIn}/>
                {menuState === 'open' && <Menu width={menuWidth}/>}
                <Notifier/>
              </header>
              <div className={classes.toolbarPlaceholder}/>

              <main className={menuState === 'open' ? classes.main : undefined}>
                <Switch>
                  <Route path="/budget/edit" component={BudgetItemForm}/>
                  <Route path="/budget" component={Budget}/>
                  <Route path="/income" component={Income}/>
                  <Route path="/outgoings" component={OutgoingListComponent}/>
                  <Route path="/outgoing/edit" component={NewOutgoingComponent}/>
                  <Route path="/signin/" component={SignIn}/>
                  <Route path="/maincategories" component={MainCategoryListComponent}/>
                  <Route path="/" component={DashboardComponent} exact/>
                  <Route path="*" component={NotFound}/>
                </Switch>
              </main>
            </div>

          )}
        </Router>
      </div>
    );
  };
}

AppComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  menuState: PropTypes.string.isRequired,
};

const AppWithStyles = withStyles(styles)(AppComponent);

const mapStateToProps = state => ({
  menuState: getMenuState(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppWithStyles);
