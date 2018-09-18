import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  TableCell, TableRow,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const BudgetListItemComponent = (props) => {
  const { item } = props;
  return (
    <TableRow key={item.id}>
      <TableCell component="th">{item.category}</TableCell>
      <TableCell numeric>{item.monthly || '-'}</TableCell>
      <TableCell numeric>{item.yearly || '-'}</TableCell>
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
    monthly: PropTypes.number,
    yearly: PropTypes.string,
  }).isRequired,
};

export default BudgetListItemComponent;
