import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from '@material-ui/core';
import moment from "moment/moment";
import { actions, getCurrency } from '../redux/modules/AppReducer';

class OutgoingItemComponent extends Component {

    static propTypes = {
        outgoing: PropTypes.shape({
            id: PropTypes.string.isRequired,
            outgoingTitle: PropTypes.string.isRequired,
            outgoingDate: PropTypes.string.isRequired,
            outgoingCategory: PropTypes.string.isRequired,
            outgoingAmount: PropTypes.number.isRequired,
        }).isRequired,
    };

    render() {
        const { currency, outgoing } = this.props;

        return (
            <TableRow key={outgoing.id}>
                <TableCell>{outgoing.outgoingTitle}</TableCell>
                <TableCell>{moment(outgoing.outgoingDate).format('DD.MM.YYYY')}</TableCell>
                <TableCell>{outgoing.outgoingCategory}</TableCell>
                <TableCell>{`${outgoing.outgoingAmount} ${currency}`}</TableCell>
            </TableRow>
        );
    }
}

const mapStateToProps = state => ({
    currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OutgoingItemComponent);
