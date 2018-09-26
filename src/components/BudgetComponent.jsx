import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BottomNavigation, BottomNavigationAction,
  Paper,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Loading from './LoadingComponent';
import BudgetList from './BudgetListComponent';
import BudgetSummary from './BudgetSummaryComponent';

class BudgetComponent extends Component {
  async componentDidMount() {
    const {
      doLoadBudgetGroups, doLoadBudget,
    } = this.props;
    await doLoadBudgetGroups();
    await doLoadBudget();
  }

  handleChange = (event, value) => {
    const paths = {
      addBudgetEntry: '/budget/edit',
    };
    const { history } = this.props;
    history.push(paths[value]);
  }

  render() {
    const {
      isLoading,
      budget, budgetGroups,
    } = this.props;

    return (
      <Paper>
        <Typography variant="headline" component="h2">Budget</Typography>
        { isLoading ? <Loading /> : (
          <div>
            { budgetGroups.map((group) => {
              const list = budget.filter(item => item.group === group);
              return list.length !== 0 && <BudgetList key={group} title={group} list={list} />;
            }) }
            <BudgetSummary budget={budget} />
            <BottomNavigation
              showLabels
              onChange={this.handleChange}
            >
              <BottomNavigationAction value="addBudgetEntry" label="Eintrag hinzufügen" icon={<AddCircleIcon />} />
            </BottomNavigation>
          </div>
        ) }
      </Paper>
    );
  }
}

BudgetComponent.propTypes = {
  doLoadBudgetGroups: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  budgetGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BudgetComponent;
