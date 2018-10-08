import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  TableCell, TableRow,
} from '@material-ui/core';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
} from '../redux/modules/BudgetReducer';

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

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetListSummaryComponent);
