import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import randomColor from 'randomcolor';
import {
  Button,
  Card, CardContent, CardActionArea, CardActions,
  FormControl, FormControlLabel,
  IconButton,
  Input, InputLabel, InputAdornment,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions as budgetActions,
} from '../redux/modules/BudgetReducer';
import {
  actions as mainCategoryActions,
  getIsLoading, getMainCategories,
} from '../redux/modules/MainCategoryReducer';
import Loading from './LoadingComponent';
import MainCategoryList from './MainCategoryListComponent';
import { auth } from '../config/firebase';

class BudgetItemFormComponent extends Component {
  state = {
    open: false,
    budgetEntry: {
      id: null,
      mainCategoryId: null,
      category: '',
      color: randomColor(),
      period: 'monthly',
      amount: 0,
    },
  };

  componentDidMount = () => {
    const {
      location,
      doLoadMainCategories,
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
    doLoadMainCategories();
  }

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
  }

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

    if (!auth.currentUser) {
      return <Redirect to="/signin/"/>;
    }

    return (
      <div>
        <Typography variant="headline" component="h2">Budgeteintrag erfassen</Typography>
        { open && <MainCategoryList open onClose={() => this.setState({ open: false })} /> }
        <Card>
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              { isLoadingCategories ? <Loading /> : (
                <div>
                  <FormControl>
                    <InputLabel htmlFor="main-category-select">Gruppe</InputLabel>
                    <Select
                      value={budgetEntry.mainCategoryId || ''}
                      onChange={(event) => {
                        this.setState({
                          budgetEntry: { ...budgetEntry, mainCategoryId: event.target.value },
                        });
                      }}
                      inputProps={{
                        name: 'mainCategory',
                        id: 'main-category-select',
                      }}
                    >
                      { mainCategories.map(mainCategory => (
                        <MenuItem key={mainCategory.id} value={mainCategory.id}>
                          {mainCategory.description}
                        </MenuItem>
                      )) }
                    </Select>
                  </FormControl>
                  <IconButton
                    aria-label="Gruppe hinzufügen"
                    onClick={() => this.setState({ open: true })}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              )}
              <FormControl>
                <TextField
                  id="category"
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
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="color">Farbe</InputLabel>
                <Input
                  id="color"
                  name="color"
                  type="color"
                  value={budgetEntry.color}
                  onChange={(event) => {
                    this.setState({ budgetEntry: { ...budgetEntry, color: event.target.value } });
                  }}
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  label="jährlich"
                  labelPlacement="start"
                  control={(
                    <FormControlLabel
                      control={(
                        <Switch
                          id="monthly"
                          value={budgetEntry.period}
                          checked={budgetEntry.period === 'monthly'}
                          onChange={(event) => {
                            this.setState({
                              budgetEntry: { ...budgetEntry, period: event.target.value === 'monthly' ? 'yearly' : 'monthly' },
                            });
                          }}
                          color="primary"
                        />
                      )}
                      label="monatlich"
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="amount">Betrag</InputLabel>
                <Input
                  id="amount"
                  type="number"
                  value={budgetEntry.amount}
                  onChange={(event) => {
                    this.setState({ budgetEntry: { ...budgetEntry, amount: event.target.value } });
                  }}
                  startAdornment={
                    <InputAdornment position="start">{currency}</InputAdornment>
                  }
                />
              </FormControl>
            </CardContent>
            <CardActionArea>
              <CardActions>
                <Button variant="contained" type="submit">Hinzufügen</Button>
              </CardActions>
            </CardActionArea>
          </form>
        </Card>
      </div>
    );
  }
}

BudgetItemFormComponent.propTypes = {
  location: PropTypes.shape({ state: PropTypes.object }).isRequired,
  isLoadingCategories: PropTypes.bool.isRequired,
  doLoadMainCategories: PropTypes.func.isRequired,
  doUpdateBudgetEntry: PropTypes.func.isRequired,
  doAddBudgetEntry: PropTypes.func.isRequired,
  mainCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoadingCategories: getIsLoading(state),
  mainCategories: getMainCategories(state),
  currency: getCurrency(state),
});

const actions = {
  ...budgetActions,
  ...mainCategoryActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetItemFormComponent);
