import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from '@material-ui/core';

class OutgoingItemComponent extends Component {

    static propTypes = {
        outgoing: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            amount: PropTypes.string.isRequired
        }).isRequired,
    };

    render() {
        return (
            <TableRow key={this.props.outgoing.id}>
                <TableCell>{this.props.outgoing.title}</TableCell>
                <TableCell>{this.props.outgoing.date}</TableCell>
                <TableCell>{this.props.outgoing.category}</TableCell>
                <TableCell>{this.props.outgoing.amount}</TableCell>
            </TableRow>
        );
    }
}

export default OutgoingItemComponent;