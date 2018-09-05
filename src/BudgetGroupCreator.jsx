import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent,
  TextField,
} from '@material-ui/core';

class BudgetGroupCreator extends Component {
  addGroup(event) {
    if (event.key === 'Enter') {
      const { onGroupAdded } = this.props;
      onGroupAdded(event.target.value);
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
  onGroupAdded: PropTypes.func.isRequired,
};

export default BudgetGroupCreator;
