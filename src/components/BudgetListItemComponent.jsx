import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  TableCell, TableRow,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import history from '../helper/history';

class BudgetListItemComponent extends Component {
  handleEdit = () => {
    const {
      item,
    } = this.props;
    history.push({
      pathname: '/budget/edit',
      state: { item },
    });
  }

  handleDelete = () => {
    const { doDeleteBudgetEntry, item } = this.props;
    doDeleteBudgetEntry(item.id);
  }

  render = () => {
    const { item } = this.props;
    return (
      <TableRow key={item.id}>
        <TableCell component="th">{item.category}</TableCell>
        <TableCell numeric>
          <Typography color={item.period === 'monthly' ? 'textPrimary' : 'textSecondary'}>
            {Math.round(item.monthly)}
          </Typography>
        </TableCell>
        <TableCell numeric>
          <Typography color={item.period === 'yearly' ? 'textPrimary' : 'textSecondary'}>
            {Math.round(item.yearly)}
          </Typography>
        </TableCell>
        <TableCell>
          <IconButton onClick={this.handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={this.handleDelete}>
            <DeleteOutlineIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

BudgetListItemComponent.propTypes = {
  doDeleteBudgetEntry: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    monthly: PropTypes.number.isRequired,
    yearly: PropTypes.string.isRequired,
  }).isRequired,
};

export default BudgetListItemComponent;
