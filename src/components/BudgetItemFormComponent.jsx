import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import randomColor from 'randomcolor';
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from 'react-material-ui-form-validator';
import {
  Card, CardContent, CardActions,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  Input, InputLabel, InputAdornment,
  MenuItem,
  Typography,
} from '@material-ui/core';
import {
  ToggleButtonGroup, ToggleButton,
} from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import history from '../helper/history';
import FormActions from './FormActionsComponent';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
} from '../redux/modules/BudgetReducer';
import {
  getIsLoading, getMainCategories,
} from '../redux/modules/MainCategoryReducer';
import Loading from './LoadingComponent';
import MainCategoryList from './MainCategoryListComponent';
import { gridSpacing } from '../theme';

class BudgetItemFormComponent extends Component {
  state = {
    open: false,
    budgetEntry: {
      id: null,
      mainCategoryId: null,
      category: '',
      color: randomColor(),
      period: 'monthly',
      amount: null,
    },
  };

  componentDidMount = () => {
    const {
      location,
    } = this.props;
    if (location.state && location.state.item) {
      const { item } = location.state;
      this.setState({
        budgetEntry: {
          id: item.id,
          mainCategoryId: item.mainCategoryId,
          category: item.category,
          color: item.color,
          period: item.period,
          amount: item.period === 'monthly' ? item.monthly : item.yearly,
        },
      });
    }
  };

  handleSubmit = async (e) => {
    const { doAddBudgetEntry, doUpdateBudgetEntry } = this.props;
    const { budgetEntry } = this.state;
    e.preventDefault();
    if (budgetEntry.period === 'monthly') {
      budgetEntry.monthly = Number(budgetEntry.amount);
      budgetEntry.yearly = budgetEntry.monthly * 12;
    } else {
      budgetEntry.yearly = Number(budgetEntry.amount);
      budgetEntry.monthly = budgetEntry.yearly / 12;
    }
    if (budgetEntry.id) {
      await doUpdateBudgetEntry({ ...budgetEntry });
    } else {
      await doAddBudgetEntry({ ...budgetEntry });
    }
  };

  handleCancel = () => {
    history.push({
      pathname: '/budget',
    });
  };

  render = () => {
    const {
      open,
      budgetEntry,
    } = this.state;
    const {
      isLoadingCategories,
      mainCategories,
      currency,
    } = this.props;

    return (
      <div>
        {open && <MainCategoryList open onClose={() => this.setState({ open: false })}/>}
        <Grid container spacing={gridSpacing} justify="center">
          <Hidden smDown>
            <Grid item sm={2} md={3} xl={4} />
          </Hidden>
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <Typography variant="h2" component="h2">Budgeteintrag erfassen</Typography>
          </Grid>
          <Hidden smDown>
            <Grid item sm={2} md={3} xl={4} />
          </Hidden>
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <Card>
              <ValidatorForm onSubmit={this.handleSubmit}>
                <CardContent>
                  <Grid container justify="space-between">
                    {isLoadingCategories ? <Loading /> : (
                      <Grid item xs={12} container justify="space-between">
                        <Grid item xs={8}>
                          <FormControl fullWidth>
                            <SelectValidator
                              name="mainCategory"
                              label="Gruppe"
                              value={budgetEntry.mainCategoryId || ''}
                              onChange={(event) => {
                                this.setState({
                                  budgetEntry: {
                                    ...budgetEntry,
                                    mainCategoryId: event.target.value,
                                  },
                                });
                              }}
                              validators={['required']}
                              errorMessages={['Eine Hauptkategorie muss ausgewählt werden.']}
                            >
                              {mainCategories.map(mainCategory => (
                                <MenuItem key={mainCategory.id} value={mainCategory.id}>
                                  {mainCategory.description}
                                </MenuItem>
                              ))}
                            </SelectValidator>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            aria-label="Gruppe hinzufügen"
                            onClick={() => this.setState({ open: true })}
                          >
                            <EditIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextValidator
                          name="category"
                          label="Bezeichnung"
                          value={budgetEntry.category}
                          onChange={(event) => {
                            this.setState({
                              budgetEntry: {
                                ...budgetEntry,
                                category: event.target.value,
                              },
                            });
                          }}
                          validators={[
                            'required',
                            'minStringLength:3',
                          ]}
                          errorMessages={[
                            'Die Bezeichnung muss ausgefüllt werden.',
                            'Die Bezeichnung muss aus mindestens drei Zeichen bestehen.',
                          ]}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl>
                        <ToggleButtonGroup
                          value={budgetEntry.period}
                          exclusive
                          onChange={(event, period) => {
                            this.setState({
                              budgetEntry: {
                                ...budgetEntry,
                                period,
                              },
                            });
                          }}
                        >
                          <ToggleButton value="monthly">monatlich</ToggleButton>
                          <ToggleButton value="yearly">jährlich</ToggleButton>
                        </ToggleButtonGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl fullWidth>
                        <TextValidator
                          name="amount"
                          label="Betrag"
                          type="number"
                          value={budgetEntry.amount || ''}
                          onChange={(event) => {
                            this.setState({
                              budgetEntry: { ...budgetEntry, amount: Number(event.target.value) },
                            });
                          }}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">{currency}</InputAdornment>,
                          }}
                          validators={[
                            'required',
                            'isPositive',
                          ]}
                          errorMessages={[
                            'Ein Betrag muss eingegeben werden.',
                            'Nur positive Beträge sind erlaubt.',
                          ]}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="color">Farbe</InputLabel>
                        <Input
                          name="color"
                          type="color"
                          value={budgetEntry.color}
                          onChange={(event) => {
                            this.setState({
                              budgetEntry: { ...budgetEntry, color: event.target.value },
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <FormActions
                    editable
                    resetFnc={() => this.handleCancel()}
                  />
                </CardActions>
              </ValidatorForm>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  };
}

BudgetItemFormComponent.propTypes = {
  location: CustomPropTypes.location.isRequired,
  isLoadingCategories: PropTypes.bool.isRequired,
  doUpdateBudgetEntry: PropTypes.func.isRequired,
  doAddBudgetEntry: PropTypes.func.isRequired,
  mainCategories: PropTypes.arrayOf(CustomPropTypes.mainCategory).isRequired,
  currency: CustomPropTypes.currency.isRequired,
};

const mapStateToProps = state => ({
  isLoadingCategories: getIsLoading(state),
  mainCategories: getMainCategories(state),
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetItemFormComponent);
