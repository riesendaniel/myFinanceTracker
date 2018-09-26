import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent,
  Table, TableCell, TableFooter, TableRow,
} from '@material-ui/core';

const BudgetSummaryComponent = (props) => {
  const { budget } = props;
  return (
    <Card>
      <CardContent>
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell numeric>
                { Math.round(budget.reduce((total, item) => total + item.monthly, 0)) }
              </TableCell>
              <TableCell numeric>
                { Math.round(budget.reduce((total, item) => total + item.yearly, 0)) }
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

BudgetSummaryComponent.propTypes = {
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BudgetSummaryComponent;
