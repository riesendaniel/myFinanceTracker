import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent,
  Table, TableCell, TableFooter, TableRow,
} from '@material-ui/core';
import BudgetGroup from './BudgetGroupComponent';
import BudgetGroupCreator from './BudgetGroupCreatorComponent';

class Budget extends Component {
  async componentDidMount() {
    const { doLoadBudgetGroups } = this.props;
    await doLoadBudgetGroups();
  }

  render() {
    const {
      isLoading,
      budget, budgetGroups,
      doAddBudgetGroup,
    } = this.props;
    return (
      <div className="Budget">
        {/* TODO: Hinzufügen neuer Gruppen entfernen */}
        <BudgetGroupCreator doAddBudgetGroup={doAddBudgetGroup} />
        <h2>Budget</h2>
        { isLoading ? <div>Wird geladen...</div> : (
          <div>
            { budgetGroups.map((group) => {
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
        ) }
      </div>
    );
  }
}

Budget.propTypes = {
  doLoadBudgetGroups: PropTypes.func.isRequired,
  doAddBudgetGroup: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  budgetGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Budget;
