import React, { Component } from 'react';
import { TableSortLabel } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTableHead,
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';

class OutgoingTableHead extends Component {
  rows = [
    {
      id: 'outgoingTitle',
      numeric: false,
      disablePadding: false,
      disableSort: false,
      label: 'Titel',
    },
    {
      id: 'outgoingDate',
      numeric: false,
      disablePadding: false,
      disableSort: false,
      label: 'Datum',
    },
    {
      id: 'outgoingCategoryId',
      numeric: false,
      disablePadding: false,
      disableSort: false,
      label: 'Kategorie',
    },
    {
      id: 'outgoingAmount',
      numeric: false,
      disablePadding: false,
      disableSort: false,
      label: 'Betrag',
    },
    {
      id: 'buttons',
      numeric: false,
      disablePadding: false,
      disableSort: true,
      label: 'Aktion',
    },
  ];

  createSortHandler = property => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  };

  render() {
    const { breakpoint, order, orderBy } = this.props;

    return (
      <ResponsiveTableHead breakpoint={breakpoint} show>
        <ResponsiveTableRow>
          {this.rows.map(row => (
            <ResponsiveTableCell
              key={row.id}
              numeric={row.numeric}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              {!row.disableSort > 0 && (
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
              )}
            </ResponsiveTableCell>
          ), this)}
        </ResponsiveTableRow>
      </ResponsiveTableHead>
    );
  }
}

OutgoingTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  breakpoint: CustomPropTypes.breakpoint.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default OutgoingTableHead;
