import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import MainCategoryListComponent from './MainCategoryListComponent';
import Menu from './MenuComponent';
import NotFound from './NotFound';
import NewOutgoingComponent from './NewOutgoingComponent';
import OutgoingListComponent from './OutgoingListComponent';
import Notifier from './Notifier';

const menuWidth = '300px';

const styles = theme => ({
  toolbarPlaceholder: theme.mixins.toolbar,
  main: {
    marginRight: menuWidth,
  },
});

const AppComponent = (props) => {
  const { classes, menuState } = props;
  return (
    <div className="App">
      <Router history={history}>
        <div>
          <header>
            <Header />
            { menuState === 'open' && <Menu width={menuWidth} /> }
            <Notifier />
          </header>
          <div className={classes.toolbarPlaceholder} />
          <main className={menuState === 'open' ? classes.main : undefined}>
            <Switch>
              <Route path="/budget/edit" component={BudgetItemForm} />
              <Route path="/budget" component={Budget} />
              <Route path="/income" component={Income} />
              <Route path="/outgoings" component={OutgoingListComponent} />
              <Route path="/outgoing/edit" component={NewOutgoingComponent} />
              <Route path="/maincategories" component={MainCategoryListComponent} />
              <Route path="/" exact />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
};

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
