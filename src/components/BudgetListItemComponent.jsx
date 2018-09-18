import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  TableCell, TableRow,
  Typography,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const BudgetListItemComponent = (props) => {
  const { item } = props;
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
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

BudgetListItemComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    monthly: PropTypes.number.isRequired,
    yearly: PropTypes.string.isRequired,
  }).isRequired,
};

export default BudgetListItemComponent;
