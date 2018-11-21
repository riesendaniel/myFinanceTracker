import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
} from '@material-ui/core';
import {
  ResponsiveTableFooter,
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';
import { actions, getCurrency } from '../redux/modules/AppReducer';

const OutgoingSummaryComponent = (props) => {
  const { breakpoint, currency, outgoings } = props;
  return (
    <ResponsiveTableFooter breakpoint={breakpoint}>
      <ResponsiveTableRow>
        <ResponsiveTableCell>
          <Typography>Total</Typography>
        </ResponsiveTableCell>
        <ResponsiveTableCell />
        <ResponsiveTableCell />
        <ResponsiveTableCell numeric>
          <Typography>{`${Math.round(outgoings.reduce((total, item) => total + item.outgoingAmount, 0))} ${currency}`}</Typography>
        </ResponsiveTableCell>
      </ResponsiveTableRow>
    </ResponsiveTableFooter>
  );
};

OutgoingSummaryComponent.propTypes = {
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
  currency: PropTypes.string.isRequired,
  outgoings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OutgoingSummaryComponent);
