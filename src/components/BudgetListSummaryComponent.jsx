import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
} from '../redux/modules/BudgetReducer';

const BudgetListSummaryComponent = (props) => {
  const {
    breakpoint,
    currency,
    list,
  } = props;
  return (
    <ResponsiveTableRow breakpoint={breakpoint}>
      <ResponsiveTableCell>
        <Typography>Total</Typography>
      </ResponsiveTableCell>
      <ResponsiveTableCell numeric columnHead="monatlich">
        <Typography>{`${Math.round(list.reduce((total, item) => total + item.monthly, 0))} ${currency}`}</Typography>
      </ResponsiveTableCell>
      <ResponsiveTableCell numeric columnHead="jährlich">
        <Typography>{`${Math.round(list.reduce((total, item) => total + item.yearly, 0))} ${currency}`}</Typography>
      </ResponsiveTableCell>
      <ResponsiveTableCell />
    </ResponsiveTableRow>
  );
};

BudgetListSummaryComponent.propTypes = {
  breakpoint: CustomPropTypes.breakpoint.isRequired,
  currency: CustomPropTypes.currency.isRequired,
  list: PropTypes.arrayOf(CustomPropTypes.budgetEntry).isRequired,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetListSummaryComponent);
