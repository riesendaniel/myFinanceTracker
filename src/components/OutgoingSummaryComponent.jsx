import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent,
  Table, TableCell, TableFooter, TableRow,
} from '@material-ui/core';

const OutgoingSummaryComponent = (props) => {
  const { outgoings } = props;
  return (
    <Card>
      <CardContent>
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell numeric>
                { Math.round(outgoings.reduce((total, item) => total + item.outgoingAmount, 0)) }
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

OutgoingSummaryComponent.propTypes = {
    outgoings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OutgoingSummaryComponent;
