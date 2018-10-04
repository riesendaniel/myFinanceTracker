import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Budget from '../container/BudgetContainer';
import BudgetItemForm from '../container/BudgetItemFormContainer';
import Header from '../container/HeaderContainer';
import Menu from './MenuComponent';
import NotFound from "./NotFound";
import NewOutgoingComponent from "./NewOutgoingComponent";
import OutgoingListComponent from "./OutgoingListComponent";

const menuWidth = '300px';

const styles = theme => ({
  toolbarPlaceholder: theme.mixins.toolbar,
  main: {
    marginRight: menuWidth,
  },
});

const App = (props) => {
  const { classes, menuState } = props;
  return (
    <div className="App">
      <Router>
        <div>
          <header>
            <Header />
            { menuState === 'open' && <Menu width={menuWidth} /> }
          </header>
          <div className={classes.toolbarPlaceholder} />
          <main className={menuState === 'open' ? classes.main : undefined}>
            <Switch>
                <Route path="/budget/edit" component={BudgetItemForm} />
                <Route path="/budget" component={Budget} />
                <Route path="/outgoings" component={OutgoingListComponent} />
                <Route path="/outgoing/edit" component={NewOutgoingComponent} />
                <Route path="/" />
                <Route component={NotFound}/>
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  menuState: PropTypes.string.isRequired,
};

export default withStyles(styles)(App);
