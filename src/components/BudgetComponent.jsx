import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
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
import RedirectComponent from './RedirectComponent';
import { auth } from '../config/firebase';
import { gridSpacing } from '../theme';

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

  handleAdd = () => {
    const { history } = this.props;
    history.push('/budget/edit');
  }

  render = () => {
    const {
      isLoadingBudget,
      isLoadingMainCategory,
      budget,
      mainCategories,
    } = this.props;

    if (!auth.currentUser) {
      return <Redirect to="/signin/" />;
    }

    return (
      <div>
        <RedirectComponent />
        <Grid container spacing={gridSpacing} justify="center">
          <Grid item xs={12} md={10}>
            <Typography variant="headline" component="h2">Budget</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            { isLoadingBudget || isLoadingMainCategory ? <Loading /> : (
              <div>
                <Grid container spacing={gridSpacing}>
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
                <Button
                  type="button"
                  variant="fab"
                  color="primary"
                  onClick={this.handleAdd}
                >
                  <AddIcon />
                </Button>
              </div>
            ) }
          </Grid>
        </Grid>
      </div>
    );
  }
}

BudgetComponent.propTypes = {
  doLoadMainCategories: PropTypes.func.isRequired,
  doLoadBudget: PropTypes.func.isRequired,
  history: CustomPropTypes.history.isRequired,
  isLoadingBudget: PropTypes.bool.isRequired,
  isLoadingMainCategory: PropTypes.bool.isRequired,
  budget: PropTypes.arrayOf(CustomPropTypes.budgetEntry).isRequired,
  mainCategories: PropTypes.arrayOf(CustomPropTypes.mainCategory).isRequired,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetComponent);
