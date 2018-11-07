import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  BottomNavigation, BottomNavigationAction,
  Grid,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import globalStyle from '../style';
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
import RedirectComponent from './RedirectComponent'
import { auth } from '../config/firebase';

export class BudgetComponent extends Component {
  componentDidMount = async () => {
    const {
      doLoadMainCategories,
      doLoadBudget,
    } = this.props;
    if (auth.currentUser) {
      await doLoadMainCategories();
      await doLoadBudget();
    }
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
      classes,
      isLoadingBudget,
      isLoadingMainCategory,
      budget,
      mainCategories,
    } = this.props;

    if (!auth.currentUser) {
      return <Redirect to="/signin/" />;
    }

    return (
      <Paper>
        <RedirectComponent />
        <Typography variant="headline" component="h2">Budget</Typography>
        { isLoadingBudget || isLoadingMainCategory ? <Loading /> : (
          <div>
            <Grid container spacing={16}>
              { mainCategories.map((mainCategory) => {
                const list = budget.filter(item => item.mainCategoryId === mainCategory.id);
                return list.length !== 0 && (
                  <Grid item xs={12}>
                    <BudgetList
                      key={mainCategory.id}
                      title={mainCategory.description}
                      list={list}
                    />
                  </Grid>
                );
              }) }
              <Grid item xs={12}>
                <BudgetSummary budget={budget} />
              </Grid>
            </Grid>
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
  doLoadBudget: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  classes: PropTypes.shape(PropTypes.object).isRequired,
  isLoadingBudget: PropTypes.bool.isRequired,
  isLoadingMainCategory: PropTypes.bool.isRequired,
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  mainCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  isLoadingBudget: getBudgetIsLoading(state),
  isLoadingMainCategory: getMainCategoryIsLoading(state),
  mainCategories: getMainCategories(state),
  budget: getBudget(state),
});

const actions = {
  ...budgetActions,
  ...mainCategoryActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withStyles(globalStyle)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetComponent));
