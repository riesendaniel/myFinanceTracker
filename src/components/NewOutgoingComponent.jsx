import React, {Component} from 'react';
import AddIcon from '@material-ui/icons/Add';
import {FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {actions, doAddOutgoing} from '../redux/modules/OutgoingReducer'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NewOutgoingComponent extends Component {

    state = {
        isOutgoingSaved: false,
        outgoingTitle: '',
        outgoingAmount: '',
        outgoingCategory: '',
        outgoingDate: ''
    };

    render() {
        return (
            <FormControl onSubmit={this.addOutgoing}>
                {this.state.isOutgoingSaved && <Redirect to='/outgoings' push/>}
                <TextField
                    id="outgoing-title" name="outgoingTitle" type="text" placeholder="Titel eingeben"
                    autoComplete="on"
                    value={this.state.outgoingTitle}
                    onChange={(event) => {
                        this.setState({outgoingTitle: event.target.value})
                    }}
                />
                <FormControl>
                    <InputLabel htmlFor="amount">Betrag</InputLabel>
                    <Input
                        id="amount"
                        type="number"
                        value={this.state.outgoingAmount}
                        onChange={(event) => {
                            this.setState({outgoingAmount: event.target.value})
                        }}
                        startAdornment={
                            <InputAdornment position="start">CHF</InputAdornment>
                        }
                    />
                </FormControl>
                <TextField
                    id="outgoing-categorie" name="outgoingCategorie" type="text" placeholder="Kategorie eingeben"
                    autoComplete="on"
                    value={this.state.outgoingCategory}
                    onChange={(event) => {
                        this.setState({outgoingCategory: event.target.value})
                    }}
                />
                <TextField
                    id="outgoing-categorie" name="outgoingCategorie" placeholder="Datum auswählen"
                    autoComplete="on"
                    type="date"
                    value={this.state.outgoingDate}
                    onChange={(event) => {
                        this.setState({outgoingDate: event.target.value})
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
            this.props.dispatch(doAddOutgoing(this.state));
            this.setState({isOutgoingSaved: true});
        } catch (e) {
            console.log(e);
        }
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

export default connect(
    mapDispatchToProps
)(NewOutgoingComponent);