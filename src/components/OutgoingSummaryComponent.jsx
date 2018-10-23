import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Card, CardContent,
  Table, TableCell, TableFooter, TableRow,
} from '@material-ui/core';
import { actions, getCurrency } from '../redux/modules/AppReducer';

const OutgoingSummaryComponent = (props) => {
  const { currency, outgoings } = props;
  return (
    <Card>
      <CardContent>
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell numeric>
                {`${Math.round(outgoings.reduce((total, item) => total + item.outgoingAmount, 0))} ${currency}`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

OutgoingSummaryComponent.propTypes = {
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
