import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTable,
  ResponsiveTableBody, ResponsiveTableFooter,
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';
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
    id: 'new',
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
    <ResponsiveTable breakpoint="sm">
      <ResponsiveTableBody>
        {deductions.map(deduction => (
          <IncomDeductionsItem key={deduction.id} deduction={deduction} />
        ))}
        <IncomDeductionsItem deduction={emptyDeduction} editable />
      </ResponsiveTableBody>
      <ResponsiveTableFooter>
        <ResponsiveTableRow>
          <ResponsiveTableCell>
            <Typography>Total Abzüge</Typography>
          </ResponsiveTableCell>
          <ResponsiveTableCell numeric>
            <Typography>{`${Math.round(totalDeductions)} ${currency}`}</Typography>
          </ResponsiveTableCell>
          <ResponsiveTableCell />
        </ResponsiveTableRow>
      </ResponsiveTableFooter>
    </ResponsiveTable>
  );
};

IncomeDeductionsComponent.propTypes = {
  currency: CustomPropTypes.currency.isRequired,
  deductions: PropTypes.arrayOf(CustomPropTypes.deduction).isRequired,
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
