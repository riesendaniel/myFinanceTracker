import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  IconButton,
  TableCell, TableRow,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

class BudgetListItemComponent extends Component {
  state = {
    redirect: false,
  }

  handleDelete = () => {
    const { doDeleteBudgetEntry, item } = this.props;
    doDeleteBudgetEntry(item.id);
  }

  render = () => {
    const { item } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: '/budget/edit',
            state: { item },
          }}
        />
      );
    }
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
          <IconButton onClick={() => this.setState({ redirect: true })}>
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