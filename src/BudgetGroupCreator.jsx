import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BudgetGroupCreator extends Component {
  addGroup(event) {
    if (event.key === 'Enter') {
      const { onGroupAdded } = this.props;
      onGroupAdded(event.target.value);
    }
  }

  render() {
    return (
      <div className="BudgetGroupCreator">
        <input onKeyUp={event => this.addGroup(event)} placeholder="Hauptkategorie hinzufügen..." />
      </div>
    );
  }
}

BudgetGroupCreator.propTypes = {
  onGroupAdded: PropTypes.func.isRequired,
};

export default BudgetGroupCreator;
