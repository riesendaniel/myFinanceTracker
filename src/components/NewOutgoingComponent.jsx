import React, {Component} from 'react';
import AddIcon from '@material-ui/icons/Add';
import {FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {actions, doAddOutgoing} from '../redux/modules/OutgoingReducer'
import {connect} from 'react-redux';
import {generateUuid} from '../helper/helper'
import {bindActionCreators} from 'redux';

class NewOutgoingComponent extends Component {

    state = {
        isOutgoingSaved: false,
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
                {this.state.isOutgoingSaved && <Redirect to='/outgoings' push/>}
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
                <TextField
                    id="outgoing-categorie" name="outgoingCategorie" type="text" placeholder="Kategorie eingeben"
                    autoComplete="on"
                    value={this.state.outgoing.outgoingCategory}
                    onChange={(event) => {
                        this.setState({outgoing: {...this.state.outgoing, outgoingCategory: event.target.value}})
                    }}
                />

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
            this.props.dispatch(doAddOutgoing(this.state.outgoing));
            this.setState({
                isOutgoingSaved: true, outgoing: {
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


const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

export default connect(
    mapDispatchToProps
)(NewOutgoingComponent);