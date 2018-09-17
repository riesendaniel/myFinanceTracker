import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import NewOutgoingComponent from "./NewOutgoingComponent";

class OutgoingComponent extends Component {

    static propTypes = {
        outgoings: PropTypes.array.isRequired,
    };

    render() {
        return (
            <Paper>
                <br/><br/><br/>
                <h2>Ausgaben</h2>
                <NewOutgoingComponent onAddOutgoing={this.onAddOutgoing}/>
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

    onAddOutgoing = (outgoing) => {
        this.props.doAddOutgoing({
            "id": "4",
            "date": "01.09.2018",
            "categorie": "Juhui",
            "title": outgoing,
            "amount": "99.99"
        });
    };
}

export default OutgoingComponent;