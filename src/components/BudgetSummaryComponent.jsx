import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Card, CardContent,
  Table, TableCell, TableFooter, TableRow,
} from '@material-ui/core';
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
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell numeric>
                {`${Math.round(budget.reduce((total, item) => total + item.monthly, 0))} ${currency}`}
              </TableCell>
              <TableCell numeric>
                {`${Math.round(budget.reduce((total, item) => total + item.yearly, 0))} ${currency}`}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
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
