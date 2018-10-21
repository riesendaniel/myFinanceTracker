import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl, FormControlLabel,
  IconButton,
  Input, InputLabel, InputAdornment,
  MenuItem,
  Paper,
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

class BudgetItemFormComponent extends Component {
  state = {
    open: false,
    budgetEntry: {
      id: null,
      mainCategoryId: null,
      category: '',
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
          period: item.period,
          amount: item.period === 'monthly' ? item.monthly : item.yearly,
        },
      });
    }
    doLoadMainCategories();
  }

  handleSubmit = async () => {
    const { doAddBudgetEntry, doUpdateBudgetEntry } = this.props;
    const { budgetEntry } = this.state;
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
      isLoading,
      mainCategories,
      currency,
    } = this.props;
    return (
      <Paper>
        <Typography variant="headline" component="h2">Budgeteintrag erfassen</Typography>
        { open && <MainCategoryList open onClose={() => this.setState({ open: false })} /> }
        <form onSubmit={this.handleSubmit}>
          { isLoading ? <Loading /> : (
            <div>
              <FormControl>
                <InputLabel htmlFor="main-category-select">Gruppe</InputLabel>
                <Select
                  value={budgetEntry.mainCategoryId}
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
                this.setState({ budgetEntry: { ...budgetEntry, category: event.target.value } });
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
          <Button variant="contained" type="submit">Hinzufügen</Button>
        </form>
      </Paper>
    );
  }
}

BudgetItemFormComponent.propTypes = {
  location: PropTypes.shape({ state: PropTypes.object }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  doLoadMainCategories: PropTypes.func.isRequired,
  doAddBudgetEntry: PropTypes.func.isRequired,
  mainCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
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
