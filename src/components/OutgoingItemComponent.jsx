import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {IconButton, TableCell, TableRow} from '@material-ui/core';
import moment from "moment/moment";
import { getCurrency } from '../redux/modules/AppReducer';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {actions} from "../redux/modules/OutgoingReducer";
import history from "../helper/history";

class OutgoingItemComponent extends Component {

    static propTypes = {
        doDeleteOutgoing: PropTypes.func.isRequired,
        outgoing: PropTypes.shape({
            id: PropTypes.string.isRequired,
            outgoingTitle: PropTypes.string.isRequired,
            outgoingDate: PropTypes.string.isRequired,
            outgoingCategoryId: PropTypes.number.isRequired,
            outgoingAmount: PropTypes.number.isRequired,
        }).isRequired,
    };

    handleEdit = () => {
        const {
            outgoing,
        } = this.props;
        history.push({
            pathname: '/outgoing/edit',
            state: { outgoing },
        });
    }

    handleDelete = () => {
        const { doDeleteOutgoing, outgoing } = this.props;
        doDeleteOutgoing(outgoing.id);
    }

    render() {
        const { currency, outgoing } = this.props;

        return (
            <TableRow key={outgoing.id}>
                <TableCell>{outgoing.outgoingTitle}</TableCell>
                <TableCell>{moment(outgoing.outgoingDate).format('DD.MM.YYYY')}</TableCell>
                <TableCell>{outgoing.outgoingCategoryId}</TableCell>
                <TableCell>{`${outgoing.outgoingAmount} ${currency}`}</TableCell>
                <TableCell>
                    <IconButton onClick={this.handleEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={this.handleDelete}>
                        <DeleteOutlineIcon />
                    </IconButton>
                </TableCell>

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
