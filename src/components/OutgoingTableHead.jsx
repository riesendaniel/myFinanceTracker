import React, { Component } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

class OutgoingTableHead extends Component {

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
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

              </TableCell>

            );
          }, this)}
        </TableRow>
      </TableHead>
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
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default OutgoingTableHead;
