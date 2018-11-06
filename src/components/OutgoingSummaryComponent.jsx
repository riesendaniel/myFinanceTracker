import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import { actions, getCurrency } from '../redux/modules/AppReducer';

const OutgoingSummaryComponent = (props) => {
  const { currency, outgoings } = props;
  return (
    <Card>
      <CardContent>
        <ResponsiveTable breakpoint="xs">
          <ResponsiveTableFooter>
            <ResponsiveTableRow>
              <ResponsiveTableCell>
                <Typography>Total</Typography>
              </ResponsiveTableCell>
              <ResponsiveTableCell numeric>
                <Typography>{`${Math.round(outgoings.reduce((total, item) => total + item.outgoingAmount, 0))} ${currency}`}</Typography>
              </ResponsiveTableCell>
            </ResponsiveTableRow>
          </ResponsiveTableFooter>
        </ResponsiveTable>
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
