import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell, TableRow,
} from '@material-ui/core';

const BudgetListSummary = (props) => {
  const { list } = props;
  return (
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell numeric>
        { list.reduce((total, item) => total + item.monthly, 0) }
      </TableCell>
      <TableCell numeric>
        { list.reduce((total, item) => total + item.yearly, 0) }
      </TableCell>
      <TableCell />
    </TableRow>
  );
};

BudgetListSummary.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    monthly: PropTypes.number,
    yearly: PropTypes.string,
  })).isRequired,
};

export default BudgetListSummary;
