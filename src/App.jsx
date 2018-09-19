import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Budget from './container/BudgetContainer';
import BudgetItemForm from './container/BudgetItemFormContainer';
import Header from './Header';
import Menu from './Menu';
import OutgoingContainer from './container/OutgoingContainer';

const styles = theme => ({
  toolbarPlaceholder: theme.mixins.toolbar,
});

const App = (props) => {
  const { classes } = props;
  return (
    <div className="App">
      <Router>
        <div>
          <header>
            <Header />
            <Menu />
          </header>
          <div className={classes.toolbarPlaceholder} />
          <main>
            <Switch>
              <Route path="/budget/edit" component={BudgetItemForm} />
              <Route path="/budget" component={Budget} />
              <Route path="/outgoings" component={OutgoingContainer} />
              <Route path="/" />
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(App);
