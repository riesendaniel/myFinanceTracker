import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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
import BudgetGroupForm from '../container/BudgetGroupFormContainer';

class BudgetItemFormComponent extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      groupSelected: '',
      redirect: false,
    };
    this.budgetEntry = {};
  }

  handleClick() {
    this.setState({ open: true });
  }

  handleChange(event) {
    this.budgetEntry.group = event.target.value;
    this.setState({ groupSelected: event.target.value });
  }

  async handleSubmit() {
    const { doAddBudgetEntry } = this.props;
    if (this.budgetEntry.monthlyPeriod === '1') {
      this.budgetEntry.monthly = this.budgetEntry.amount;
    } else {
      this.budgetEntry.yearly = this.budgetEntry.amount;
    }
    await doAddBudgetEntry({
      group: this.budgetEntry.group,
      category: this.budgetEntry.category,
      monthly: this.budgetEntry.monthly,
      yearly: this.budgetEntry.yearly,
    });
    this.setState({ redirect: true });
  }

  render() {
    const {
      open,
      groupSelected,
      redirect,
    } = this.state;
    const {
      budgetGroups,
    } = this.props;
    if (redirect) {
      return <Redirect to="/budget" />;
    }
    return (
      <Paper>
        <Typography variant="headline" component="h2">Budgeteintrag erfassen</Typography>
        { open && <BudgetGroupForm open={open} /> }
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormControl>
            <InputLabel htmlFor="group-select">Gruppe</InputLabel>
            <Select
              value={groupSelected}
              onChange={this.handleChange.bind(this)}
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
            onClick={this.handleClick.bind(this)}
          >
            <AddIcon />
          </IconButton>
          <FormControl>
            <TextField
              id="category"
              label="Bezeichnung"
              onChange={(event) => { this.budgetEntry.category = event.target.value; }}
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
                      onChange={(event) => { this.budgetEntry.monthlyPeriod = event.target.value; }}
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
              onChange={(event) => { this.budgetEntry.amount = event.target.value; }}
              startAdornment={
                <InputAdornment position="start">CHF</InputAdornment>
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
  doAddBudgetEntry: PropTypes.func.isRequired,
  budgetGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BudgetItemFormComponent;
