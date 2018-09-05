import React, { Component } from 'react';
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
  static handleSubmit() {
  }

  render() {
    return (
      <Paper>
        <Typography variant="headline" component="h2">Budgeteintrag erfassen</Typography>
        <form onSubmit="this.handleSubmit" action="/budget">
          <FormControl>
            <TextField
              id="description"
              label="Bezeichnung"
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

export default BudgetEntryEditor;
