import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from '@material-ui/core';

class OutgoingItemComponent extends Component {

    static propTypes = {
        outgoing: PropTypes.shape({
            id: PropTypes.string.isRequired,
            outgoingTitle: PropTypes.string.isRequired,
            outgoingDate: PropTypes.string.isRequired,
            outgoingCategory: PropTypes.string.isRequired,
            outgoingAmount: PropTypes.number.isRequired,
            outgoingCurrency: PropTypes.string.isRequired
        }).isRequired,
    };

    render() {
        return (
            <TableRow key={this.props.outgoing.id}>
                <TableCell>{this.props.outgoing.outgoingTitle}</TableCell>
                <TableCell>{this.props.outgoing.outgoingDate}</TableCell>
                <TableCell>{this.props.outgoing.outgoingCategory}</TableCell>
                <TableCell>{this.props.outgoing.outgoingAmount}</TableCell>
                <TableCell>{this.props.outgoing.outgoingCurrency}</TableCell>
            </TableRow>
        );
    }
}

export default OutgoingItemComponent;