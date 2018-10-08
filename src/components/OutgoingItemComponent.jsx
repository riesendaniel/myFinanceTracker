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
        const { outgoing } = this.props;

        return (
            <TableRow key={outgoing.id}>
                <TableCell>{outgoing.outgoingTitle}</TableCell>
                <TableCell>{outgoing.outgoingDate}</TableCell>
                <TableCell>{outgoing.outgoingCategory}</TableCell>
                <TableCell>{outgoing.outgoingAmount}</TableCell>
                <TableCell>{outgoing.outgoingCurrency}</TableCell>
            </TableRow>
        );
    }
}

export default OutgoingItemComponent;