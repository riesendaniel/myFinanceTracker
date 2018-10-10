import React, {Component} from 'react';
import AddIcon from '@material-ui/icons/Add';
import {FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, MenuItem, Select} from '@material-ui/core';
import {actions} from '../redux/modules/OutgoingReducer'
import {getBudgetGroups} from "../redux/modules/BudgetReducer";
import {connect} from 'react-redux';
import {generateUuid} from '../helper/helper'
import {bindActionCreators} from 'redux';

class NewOutgoingComponent extends Component {

    state = {
        outgoing: {
            id: generateUuid(),
            outgoingTitle: '',
            outgoingAmount: 0,
            outgoingCategory: '',
            outgoingDate: '',
            outgoingCurrency: 'CHF'
        },
    };

    render() {
        return (
            <FormControl onSubmit={this.addOutgoing}>
                <TextField
                    id="outgoing-title" name="outgoingTitle" type="text" placeholder="Titel eingeben"
                    autoComplete="on"
                    value={this.state.outgoing.outgoingTitle}
                    onChange={(event) => {
                        this.setState({outgoing: {...this.state.outgoing, outgoingTitle: event.target.value}})
                    }}
                />
                <FormControl>
                    <InputLabel htmlFor="amount">Betrag</InputLabel>
                    <Input
                        id="amount"
                        type="number"
                        value={this.state.outgoing.outgoingAmount}
                        onChange={(event) => {
                            this.setState({
                                outgoing: {
                                    ...this.state.outgoing,
                                    outgoingAmount: Number(event.target.value)
                                }
                            })
                        }}
                        startAdornment={
                            <InputAdornment position="start">CHF</InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="group-select">Kategorie auswählen</InputLabel>
                    <Select
                        value={this.state.outgoing.outgoingCategory}
                        onChange={(event) => {
                            this.setState({outgoing: { ...this.state.outgoing, outgoingCategory: event.target.value}})
                        }}
                        inputProps={{
                            name: 'group',
                            id: 'group-select',
                        }}
                    >
                        { this.props.groups.map(group => <MenuItem key={group} value={group}>{group}</MenuItem>) }
                    </Select>
                </FormControl>
                <TextField
                    id="outgoing-date" name="outgoingDate" placeholder="Datum auswählen"
                    autoComplete="on"
                    type="date"
                    value={this.state.outgoing.outgoingDate}
                    onChange={(event) => {
                        this.setState({outgoing: {...this.state.outgoing, outgoingDate: event.target.value}})
                    }}
                />

                <IconButton
                    aria-label="add outgoing"
                    onClick={this.addOutgoing}
                >
                    <AddIcon/>
                </IconButton>
            </FormControl>

        );
    }

    addOutgoing = () => {
        try {
            this.props.doAddOutgoing(this.state.outgoing);
            this.setState({
                outgoing: {
                    outgoingTitle: '',
                    outgoingAmount: 0,
                    outgoingCategory: '',
                    outgoingDate: '',
                    outgoingCurrency: ''
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
}

const mapStateToProps = state => ({
    groups: getBudgetGroups(state)
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewOutgoingComponent);