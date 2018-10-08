import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableRow, TableCell, TableFooter,
} from '@material-ui/core';
import IncomDeductionsItem from '../container/IncomeDeductionsItemContainer';

const IncomeDeductionsComponent = (props) => {
  const emptyDeduction = {
    description: '',
    type: 'percentaged',
    value: 0,
  };
  const {
    currency,
    deductions,
    totalDeductions,
  } = props;
  return (
    <Table>
      <TableBody>
        {deductions.map(deduction => (
          <IncomDeductionsItem key={deduction.id} deduction={deduction} />
        ))}
        <IncomDeductionsItem deduction={emptyDeduction} editable />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total Abzüge</TableCell>
          <TableCell numeric>{`${Math.round(totalDeductions)} ${currency}`}</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

IncomeDeductionsComponent.propTypes = {
  currency: PropTypes.string.isRequired,
  deductions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  totalDeductions: PropTypes.number.isRequired,
};

export default IncomeDeductionsComponent;
