import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
} from '@material-ui/core';

class OutgoingComponent extends Component {
  componentDidMount() {
  }

  render() {
    const { outgoings } = this.props;
    return (
      <Paper className="container">
        <br />
        <br />
        <br />
        <h2>Ausgaben</h2>
        <Table className="tab">
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
  }
}

OutgoingComponent.propTypes = {
  outgoings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OutgoingComponent;
