import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  getIsLoading as getBudgetIsLoading, getBudget,
} from '../redux/modules/BudgetReducer';
import {
  getIsLoading as getMainCategoryIsLoading, getMainCategories,
} from '../redux/modules/MainCategoryReducer';
import Loading from './LoadingComponent';
import BudgetList from './BudgetListComponent';
import BudgetSummary from './BudgetSummaryComponent';
import { gridSpacing } from '../theme';

export class BudgetComponent extends Component {
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

    return (
      <div>
        <Grid container spacing={gridSpacing} justify="center">
          <Grid item xs={12} md={10}>
            <Typography variant="h2" component="h2">Budget</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            { isLoadingBudget || isLoadingMainCategory ? <Loading /> : (
              <div>
                <Grid container spacing={gridSpacing}>
                  { mainCategories.map((mainCategory) => {
                    const list = budget.filter(item => item.mainCategoryId === mainCategory.id);
                    return list.length !== 0 && (
                      <Grid item xs={12} key={mainCategory.id}>
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

export default connect(
  mapStateToProps,
)(BudgetComponent);
