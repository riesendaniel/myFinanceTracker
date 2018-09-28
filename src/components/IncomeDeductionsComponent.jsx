import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Table, TableBody, TableRow, TableCell, TableFooter,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

const IncomeDeductionsComponent = (props) => {
  const {
    deductions,
    totalDeductions,
  } = props;
  return (
    <Table>
      <TableBody>
        {deductions.map(deduction => (
          <TableRow key={deduction.id}>
            <TableCell>{deduction.description}</TableCell>
            <TableCell numeric>
              {`${deduction.value} ${deduction.type === 'percentaged' ? '%' : 'CHF'}`}
            </TableCell>
            <TableCell>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteOutlineIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total Abzüge</TableCell>
          <TableCell numeric>{`${Math.round(totalDeductions)} CHF`}</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

IncomeDeductionsComponent.propTypes = {
  deductions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  totalDeductions: PropTypes.number.isRequired,
};

export default IncomeDeductionsComponent;
