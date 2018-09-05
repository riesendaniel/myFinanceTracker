import React, { Component } from 'react';

class BudgetEntryEditor extends Component {
  static handleSubmit() {
  }

  render() {
    return (
      <div className="BudgetEntryEditor">
        <h2>Budgeteintrag erfassen</h2>
        <form onSubmit="this.handleSubmit" action="/budget">
          <input type="text" placeholder="Bezeichnung" />
          <label htmlFor="monthly">
            <input id="monthly" type="radio" name="period" value="monthly" />
            <span>monatlich</span>
          </label>
          <input type="number" placeholder="CHF" />
          <label htmlFor="yearly">
            <input id="yearly" type="radio" name="period" value="yearly" />
            <span>jährlich</span>
          </label>
          <input type="number" placeholder="CHF" />
          <button type="submit">Hinzufügen</button>
        </form>
      </div>
    );
  }
}

export default BudgetEntryEditor;
