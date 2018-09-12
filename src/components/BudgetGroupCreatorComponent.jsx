import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent,
  TextField,
} from '@material-ui/core';

class BudgetGroupCreator extends Component {
  addGroup(event) {
    if (event.key === 'Enter') {
      const { doAddBudgetGroup } = this.props;
      doAddBudgetGroup(event.target.value);
      event.target.value = null;
    }
  }

  render() {
    return (
      <Card>
        <CardContent>
          <TextField
            id="category"
            label="Hauptkategorie hinzufügen..."
            placeholder="Hauptkategorie hinzufügen..."
            onKeyUp={event => this.addGroup(event)}
            fullWidth
          />
        </CardContent>
      </Card>
    );
  }
}

BudgetGroupCreator.propTypes = {
  doAddBudgetGroup: PropTypes.func.isRequired,
};

export default BudgetGroupCreator;
