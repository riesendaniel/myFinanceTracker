import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Card, CardContent,
  Typography,
} from '@material-ui/core';
import {
  ResponsiveTable,
  ResponsiveTableFooter,
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
} from '../redux/modules/BudgetReducer';

const BudgetSummaryComponent = (props) => {
  const {
    budget,
    currency,
  } = props;
  return (
    <Card>
      <CardContent>
        <ResponsiveTable breakpoint="xs">
          <ResponsiveTableFooter>
            <ResponsiveTableRow>
              <ResponsiveTableCell>
                <Typography>Total</Typography>
              </ResponsiveTableCell>
              <ResponsiveTableCell numeric columnHead="monatlich">
                <Typography>{`${Math.round(budget.reduce((total, item) => total + item.monthly, 0))} ${currency}`}</Typography>
              </ResponsiveTableCell>
              <ResponsiveTableCell numeric columnHead="jährlich">
                <Typography>{`${Math.round(budget.reduce((total, item) => total + item.yearly, 0))} ${currency}`}</Typography>
              </ResponsiveTableCell>
              <ResponsiveTableCell />
            </ResponsiveTableRow>
          </ResponsiveTableFooter>
        </ResponsiveTable>
      </CardContent>
    </Card>
  );
};

BudgetSummaryComponent.propTypes = {
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetSummaryComponent);
