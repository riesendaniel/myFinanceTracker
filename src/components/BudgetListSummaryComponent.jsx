import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell, TableRow,
} from '@material-ui/core';

const BudgetListSummaryComponent = (props) => {
  const {
    currency,
    list,
  } = props;
  return (
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell numeric>
        {`${Math.round(list.reduce((total, item) => total + item.monthly, 0))} ${currency}`}
      </TableCell>
      <TableCell numeric>
        {`${Math.round(list.reduce((total, item) => total + item.yearly, 0))} ${currency}`}
      </TableCell>
      <TableCell />
    </TableRow>
  );
};

BudgetListSummaryComponent.propTypes = {
  currency: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    monthly: PropTypes.number,
    yearly: PropTypes.number,
  })).isRequired,
};

export default BudgetListSummaryComponent;
