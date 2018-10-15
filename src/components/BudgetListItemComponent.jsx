import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  IconButton,
  TableCell, TableRow,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import history from '../helper/history';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
} from '../redux/modules/BudgetReducer';

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
    const {
      currency,
      item,
    } = this.props;
    return (
      <TableRow key={item.id}>
        <TableCell component="th">{item.category}</TableCell>
        <TableCell numeric>
          <Typography color={item.period === 'monthly' ? 'textPrimary' : 'textSecondary'}>
            {`${Math.round(item.monthly)} ${currency}`}
          </Typography>
        </TableCell>
        <TableCell numeric>
          <Typography color={item.period === 'yearly' ? 'textPrimary' : 'textSecondary'}>
            {`${Math.round(item.yearly)} ${currency}`}
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
  currency: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    monthly: PropTypes.number.isRequired,
    yearly: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetListItemComponent);
