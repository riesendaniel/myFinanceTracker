import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

class OutgoingComponent extends Component {

    static propTypes = {
        outgoings: PropTypes.array.isRequired,
    };

    componentDidMount() {
    }

    render() {
        return (
            <Paper className="container">
                <br /><br /><br />
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
                        {this.props.outgoings.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.categorie}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default OutgoingComponent;