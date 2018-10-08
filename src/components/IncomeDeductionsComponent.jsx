import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableRow, TableCell, TableFooter,
} from '@material-ui/core';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
  getDeductions, getTotalDeductions,
} from '../redux/modules/IncomeReducer';
import IncomDeductionsItem from './IncomeDeductionsItemComponent';

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

const mapStateToProps = state => ({
  currency: getCurrency(state),
  deductions: getDeductions(state),
  totalDeductions: getTotalDeductions(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeDeductionsComponent);
