import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
} from '@material-ui/core';

class BudgetEntryEditor extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.budgetEntry = {};
  }

  async handleSubmit() {
    const { location, doAddBudgetEntry } = this.props;
    this.budgetEntry.group = location.query.group;
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
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/budget" />;
    }
    return (
      <Paper>
        <Typography variant="headline" component="h2">Budgeteintrag erfassen</Typography>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {/* TODO: Auswahlliste für Gruppen (und Hinzufügen neuer Gruppen) */}
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

BudgetEntryEditor.propTypes = {
  doAddBudgetEntry: PropTypes.func.isRequired,
  location: PropTypes.shape({ query: PropTypes.object.isRequired }).isRequired,
};

export default BudgetEntryEditor;
