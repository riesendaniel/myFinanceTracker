import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {FormControl, TextField, IconButton, InputAdornment, Input, InputLabel} from '@material-ui/core';

class NewOutgoingComponent extends Component {

    static propTypes = {
        onAddOutgoing: PropTypes.func.isRequired
    };

    state = {
        outgoingTitle: '',
        outgoingAmount: '',
        outgoingCategory: '',
        outgoingDate: ''
    };

    render() {
        return (
            <FormControl onSubmit={this.addOutgoing}>
                <TextField
                    id="outgoing-title" name="outgoingTitle" type="text" placeholder="Titel eingeben"
                    autoComplete="on"
                    value={this.state.outgoingTitle}
                    onChange={(event) => { this.setState({outgoingTitle: event.target.value })}}
                />
                <FormControl>
                    <InputLabel htmlFor="amount">Betrag</InputLabel>
                    <Input
                        id="amount"
                        type="number"
                        value={this.state.outgoingAmount}
                        onChange={(event) => { this.setState({outgoingAmount: event.target.value}) }}
                        startAdornment={
                            <InputAdornment position="start">CHF</InputAdornment>
                        }
                    />
                </FormControl>
                <TextField
                    id="outgoing-categorie" name="outgoingCategorie" type="text" placeholder="Kategorie eingeben"
                    autoComplete="on"
                    value={this.state.outgoingCategory}
                    onChange={(event) => { this.setState({outgoingCategory: event.target.value })}}
                />
                <TextField
                    id="outgoing-categorie" name="outgoingCategorie" type="text" placeholder="Datum auswählen"
                    autoComplete="on"
                    type="date"
                    value={this.state.outgoingDate}
                    onChange={(event) => { this.setState({outgoingDate: event.target.value })}}
                />
                <IconButton
                    aria-label="add outgoing"
                    onClick={this.addOutgoing}
                >
                    <AddIcon />
                </IconButton>

            </FormControl>
        );
    }

    addOutgoing = (e) => {
        e.preventDefault();
        this.props.onAddOutgoing(this.state.outgoingAmount, this.state.outgoingCategory, this.state.outgoingDate, this.state.outgoingTitle);
        this.setState({outgoingAmount: '', outgoingCategory: '', outgoingDate: '', outgoingTitle: ''});
    }
}

export default NewOutgoingComponent;