import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card, CardContent,
  Fab,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CompareIcon from '@material-ui/icons/Compare';
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

const styles = () => ({
  blankIcon: {
    fontSize: '10rem',
    opacity: 0.25,
    width: '100%',
  },
  blankText: {
    width: '75%',
  },
});

export class BudgetComponent extends Component {
  handleAdd = () => {
    const { history } = this.props;
    history.push('/budget/edit');
  }

  render = () => {
    const {
      budget,
      mainCategories,
    } = this.props;

    const noDataToRender = () => {
      const {
        isLoadingBudget,
        isLoadingMainCategory,
        classes,
      } = this.props;
      if (isLoadingBudget || isLoadingMainCategory) {
        return <Loading />;
      }
      if (budget.length === 0) {
        return (
          <Card>
            <CardContent>
              <Grid container justify="center">
                <CompareIcon className={classes.blankIcon} />
                <Typography className={classes.blankText} align="center">
                  {`Damit an dieser Stelle das monatlich zur Verfügung stehende Budget
                  dargestellt wird, muss mindestens ein Budgeteintrag erfasst werden.
                  Dazu kann die Schaltfläche unten rechts verwendet werden.`}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        );
      }
      return false;
    };

    return (
      <div>
        <Grid container spacing={gridSpacing} justify="center">
          <Grid item xs={12} md={10}>
            <Typography variant="h2" component="h2" data-test-id={'title-budget'}>Budget</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            { noDataToRender() || (
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
              </div>
            ) }
            <Fab
              aria-label="Budgeteintrag hinzufügen"
              color="primary"
              onClick={this.handleAdd}
            >
              <AddIcon />
            </Fab>
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
  classes: CustomPropTypes.classes.isRequired,
  mainCategories: PropTypes.arrayOf(CustomPropTypes.mainCategory).isRequired,
};

const mapStateToProps = state => ({
  isLoadingBudget: getBudgetIsLoading(state),
  isLoadingMainCategory: getMainCategoryIsLoading(state),
  mainCategories: getMainCategories(state),
  budget: getBudget(state),
});

const ComponentWithStyles = withStyles(styles)(BudgetComponent);

export default connect(
  mapStateToProps,
)(ComponentWithStyles);
