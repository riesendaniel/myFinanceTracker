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
import AddIcon from '@material-ui/icons/Add';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
  getIsBudgetGroupFormOpen, getBudgetGroups,
} from '../redux/modules/BudgetReducer';
import BudgetGroupForm from './BudgetGroupFormComponent';

class BudgetItemFormComponent extends Component {
  state = {
    budgetEntry: {
      id: null,
      group: '',
      category: '',
      period: 'monthly',
      amount: 0,
    },
  };

  componentDidMount = () => {
    const { location } = this.props;
    if (location.state && location.state.item) {
      const { item } = location.state;
      this.setState({
        budgetEntry: {
          id: item.id,
          group: item.group,
          category: item.category,
          period: item.period,
          amount: item.period === 'monthly' ? item.monthly : item.yearly,
        },
      });
    }
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
      doAddBudgetEntry({ ...budgetEntry });
    }
  }

  render = () => {
    const {
      budgetEntry,
    } = this.state;
    const {
      open,
      budgetGroupFormIsOpen,
      budgetGroups,
      currency,
    } = this.props;
    return (
      <Paper>
        <Typography variant="headline" component="h2">Budgeteintrag erfassen</Typography>
        { open && <BudgetGroupForm /> }
        <form onSubmit={this.handleSubmit}>
          <FormControl>
            <InputLabel htmlFor="group-select">Gruppe</InputLabel>
            <Select
              value={budgetEntry.group}
              onChange={(event) => {
                this.setState({ budgetEntry: { ...budgetEntry, group: event.target.value } });
              }}
              inputProps={{
                name: 'group',
                id: 'group-select',
              }}
            >
              { budgetGroups.map(group => <MenuItem key={group} value={group}>{group}</MenuItem>) }
            </Select>
          </FormControl>
          <IconButton
            aria-label="Gruppe hinzufügen"
            onClick={() => budgetGroupFormIsOpen(true)}
          >
            <AddIcon />
          </IconButton>
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
  doAddBudgetEntry: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  budgetGroupFormIsOpen: PropTypes.func.isRequired,
  budgetGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  open: getIsBudgetGroupFormOpen(state),
  budgetGroups: getBudgetGroups(state),
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetItemFormComponent);
