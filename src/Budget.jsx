import React, { Component } from 'react';
import BudgetGroup from './BudgetGroup';
import BudgetGroupCreator from './BudgetGroupCreator';

const groupsMock = [
  'Wohnen',
  'Haushalt',
  'Gesundheit & Körper',
  'Freizeit',
  'Reisen',
  'Versicherungen',
  'Steuern',
  'Sparen & Anlegen',
];

const budgetMock = [
  {
    id: 1,
    group: 'Haushalt',
    category: 'Unterhalt',
    monthly: 100,
    yearly: null,
  },
  {
    id: 2,
    group: 'Haushalt',
    category: 'Essen & Getränke',
    monthly: 250,
    yearly: null,
  },
  {
    id: 3,
    group: 'Mobilität',
    category: 'öffentlicher Verkehr',
    monthly: null,
    yearly: 2600,
  },
];

class Budget extends Component {
  constructor() {
    super();
    this.state = {
      budget: budgetMock,
      groups: groupsMock,
    };
  }

  addGroup(name) {
    this.setState(state => ({ groups: state.concat(name) }));
  }

  render() {
    const { budget, groups } = this.state;
    return (
      <div className="Budget">
        <h2>Budget</h2>
        { groups.map((group) => {
          const list = budget.filter(item => item.group === group);
          return list.length !== 0 && <BudgetGroup key={group} group={group} budget={list} />;
        }) }
        <BudgetGroupCreator onGroupAdded={name => this.addGroup(name)} />
        <div>
          <span>Total</span>
          <span>{ budget.reduce((total, item) => total + item.monthly, 0) }</span>
          <span>{ budget.reduce((total, item) => total + item.yearly, 0) }</span>
        </div>
      </div>
    );
  }
}

export default Budget;
