import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  BottomNavigation, BottomNavigationAction,
  Paper,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  actions as budgetActions,
  getIsLoading as getBudgetIsLoading, getBudget,
} from '../redux/modules/BudgetReducer';
import {
  actions as mainCategoryActions,
  getIsLoading as getMainCategoryIsLoading, getMainCategories,
} from '../redux/modules/MainCategoryReducer';
import Loading from './LoadingComponent';
import BudgetList from './BudgetListComponent';
import BudgetSummary from './BudgetSummaryComponent';

class BudgetComponent extends Component {
  componentDidMount = async () => {
    const {
      doLoadMainCategories,
      doLoadBudget,
    } = this.props;
    await doLoadMainCategories();
    await doLoadBudget();
  }

  handleChange = (event, value) => {
    const paths = {
      addBudgetEntry: '/budget/edit',
    };
    const { history } = this.props;
    history.push(paths[value]);
  }

  render = () => {
    const {
      isLoading,
      budget,
      mainCategories,
    } = this.props;

    return (
      <Paper>
        <Typography variant="headline" component="h2">Budget</Typography>
        { isLoading ? <Loading /> : (
          <div>
            { mainCategories.map((mainCategory) => {
              const list = budget.filter(item => item.mainCategoryId === mainCategory.id);
              return list.length !== 0 && (
                <BudgetList key={mainCategory.id} title={mainCategory.description} list={list} />
              );
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
  doLoadMainCategories: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  mainCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  isLoading: getBudgetIsLoading(state) || getMainCategoryIsLoading(state),
  mainCategories: getMainCategories(state),
  budget: getBudget(state),
});

const actions = {
  ...budgetActions,
  ...mainCategoryActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetComponent);
