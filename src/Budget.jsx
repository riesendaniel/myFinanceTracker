import React, { Component } from 'react';
import {
  Card, CardContent,
  Table, TableCell, TableFooter, TableRow,
} from '@material-ui/core';
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
    this.setState(state => ({ groups: [...state.groups, name] }));
  }

  render() {
    const { budget, groups } = this.state;
    return (
      <div className="Budget">
        <BudgetGroupCreator onGroupAdded={name => this.addGroup(name)} />
        <h2>Budget</h2>
        { groups.map((group) => {
          const list = budget.filter(item => item.group === group);
          return list.length !== 0 && <BudgetGroup key={group} group={group} budget={list} />;
        }) }
        <Card>
          <CardContent>
            <Table>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell numeric>
                    { budget.reduce((total, item) => total + item.monthly, 0) }
                  </TableCell>
                  <TableCell numeric>
                    { budget.reduce((total, item) => total + item.yearly, 0) }
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Budget;
