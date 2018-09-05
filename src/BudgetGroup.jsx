import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button, IconButton,
  Card, CardActions, CardContent, CardHeader,
  Table, TableBody, TableCell, TableHead, TableFooter, TableRow,
  Typography,
} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const BudgetGroup = (props) => {
  const { budget, group } = props;
  return (
    <Card>
      <CardHeader
        avatar={(
          <Avatar>
            <CategoryIcon />
          </Avatar>
        )}
        title={group}
      />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kategorie</TableCell>
              <TableCell numeric>monatlich</TableCell>
              <TableCell numeric>jährlich</TableCell>
              <TableCell>Entfernen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { budget.map(item => (
              <TableRow key={item.id}>
                <TableCell component="th">{item.category}</TableCell>
                <TableCell numeric>{item.monthly}</TableCell>
                <TableCell numeric>{item.yearly || '-'}</TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell numeric>
                { budget.reduce((total, item) => total + item.monthly, 0) }
              </TableCell>
              <TableCell numeric>
                { budget.reduce((total, item) => total + item.yearly, 0) }
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <CardActions>
        <Button>
          <Typography component="p">
            <Link to="/budget/edit">Eintrag hinzufügen...</Link>
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

BudgetGroup.propTypes = {
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  group: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BudgetGroup;
