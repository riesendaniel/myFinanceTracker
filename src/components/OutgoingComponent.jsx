import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';

const OutgoingComponent = (props) => {
  const { outgoings } = props;
  return (
    <Paper>
      <h2>Ausgaben</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titel</TableCell>
            <TableCell>Datum</TableCell>
            <TableCell>Kategorie</TableCell>
            <TableCell>Betrag</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outgoings.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.categorie}</TableCell>
              <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

OutgoingComponent.propTypes = {
  outgoings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OutgoingComponent;
