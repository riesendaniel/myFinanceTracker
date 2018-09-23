import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import Loading from './LoadingComponent';
import NewOutgoingComponent from "./NewOutgoingComponent";
import OutgoingItemComponent from "./OutgoingItemComponent";

class OutgoingListComponent extends Component {

    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        outgoings: PropTypes.array.isRequired,
    };

    async componentDidMount() {
        const { doLoadOutgoings } = this.props;
        await doLoadOutgoings();
    }

    render() {
        return (
            <Paper>
                <br/><br/><br/>
                <h2>Ausgaben</h2>
                <NewOutgoingComponent onAddOutgoing={this.onAddOutgoing}/>
                {this.props.isLoading ? <Loading/> : (
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
                                    <OutgoingItemComponent outgoing={row}/>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </Paper>
        );
    }

    onAddOutgoing = (amount, category, date, title) => {

        this.props.doAddOutgoing({
            "id": this.uuid(),
            "date": date,
            "categorie": category,
            "title": title,
            "amount": amount
        });
    };

    //TODO  Nur temporär bis Firebase angebunden ist
    uuid() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    //TODO  Nur temporär bis Firebase angebunden ist
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}

export default OutgoingListComponent;