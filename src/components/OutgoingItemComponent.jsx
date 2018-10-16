import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {IconButton, TableCell, TableRow} from '@material-ui/core';
import moment from "moment/moment";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {bindActionCreators} from "redux";
import {actions} from "../redux/modules/OutgoingReducer";
import {connect} from 'react-redux';
import history from "../helper/history";

class OutgoingItemComponent extends Component {

    static propTypes = {
        doDeleteOutgoing: PropTypes.func.isRequired,
        outgoing: PropTypes.shape({
            id: PropTypes.string.isRequired,
            outgoingTitle: PropTypes.string.isRequired,
            outgoingDate: PropTypes.string.isRequired,
            outgoingCategory: PropTypes.string.isRequired,
            outgoingAmount: PropTypes.number.isRequired,
            outgoingCurrency: PropTypes.string.isRequired
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
        const { outgoing } = this.props;

        return (
            <TableRow key={outgoing.id}>
                <TableCell>{outgoing.outgoingTitle}</TableCell>
                <TableCell>{moment(outgoing.outgoingDate).format('DD.MM.YYYY')}</TableCell>
                <TableCell>{outgoing.outgoingCategory}</TableCell>
                <TableCell>{outgoing.outgoingAmount}</TableCell>
                <TableCell>{outgoing.outgoingCurrency}</TableCell>
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

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OutgoingItemComponent);
