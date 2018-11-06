import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableSortLabel } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import {
  ResponsiveTableHead,
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';

class OutgoingTableHead extends Component {

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { breakpoint, order, orderBy } = this.props;

    return (
      <ResponsiveTableHead breakpoint={breakpoint} show>
        <ResponsiveTableRow>
          {rows.map(row => {
            return (
              <ResponsiveTableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                {!row.disableSort > 0 &&
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
                }

              </ResponsiveTableCell>

            );
          }, this)}
        </ResponsiveTableRow>
      </ResponsiveTableHead>
    );
  }
}
const rows = [
  {
    id: 'outgoingTitle',
    numeric: false,
    disablePadding: false,
    disableSort: false,
    label: 'Titel'
  },
  {
    id: 'outgoingDate',
    numeric: false,
    disablePadding: false,
    disableSort: false,
    label: 'Datum'
  },
  {
    id: 'outgoingCategoryId',
    numeric: false,
    disablePadding: false,
    disableSort: false,
    label: 'Kategorie'
  },
  {
    id: 'outgoingAmount',
    numeric: false,
    disablePadding: false,
    disableSort: false,
    label: 'Betrag'
  },
  {
    id: 'buttons',
    numeric: false,
    disablePadding: false,
    disableSort: true,
    label: 'Aktion'
  },
];

OutgoingTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
  classes: PropTypes.shape(PropTypes.object).isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default OutgoingTableHead;
