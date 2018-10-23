import React, {Component} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import {
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, MenuItem, Select} from '@material-ui/core';
import {actions as outgoingActions} from '../redux/modules/OutgoingReducer';
import { getCurrency } from '../redux/modules/AppReducer';
import {actions as budgetActions, getCategories} from "../redux/modules/BudgetReducer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class NewOutgoingComponent extends Component {

    static propTypes = {
        currency: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    state = {
        outgoing: {
            outgoingTitle: '',
            outgoingAmount: 0,
            outgoingCategoryId: null,
            outgoingDate: '',
        },
    };

    componentDidMount = () => {
        const {location} = this.props;
        if (location.state && location.state.outgoing) {
            const {outgoing} = location.state;
            this.setState({
                outgoing: {
                    id: outgoing.id,
                    outgoingTitle: outgoing.outgoingTitle,
                    outgoingAmount: outgoing.outgoingAmount,
                    outgoingCategory: outgoing.outgoingCategory,
                    outgoingDate: outgoing.outgoingDate,
                    outgoingCurrency: 'CHF'
                },
            });
        }
    }

    render() {
        const { currency, categories } = this.props;
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
                            <InputAdornment position="start">{currency}</InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="group-select">Kategorie auswählen</InputLabel>
                    <Select
                        value={this.state.outgoing.outgoingCategoryId}
                        onChange={(event) => {
                            this.setState({outgoing: { ...this.state.outgoing, outgoingCategoryId: event.target.value}})
                        }}
                        inputProps={{
                            name: 'group',
                            id: 'group-select',
                        }}
                    >
                        { categories.map(category => <MenuItem key={category.id} value={category.id}>{category.description}</MenuItem>) }
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
                    <SaveIcon/>
                </IconButton>
            </FormControl>

        );
    }

    addOutgoing = () => {
        try {
            if (this.state.outgoing.id) {
                this.props.doUpdateOutgoing(this.state.outgoing);
            } else {
                this.props.doAddOutgoing(this.state.outgoing);
            }
            this.setState({
                outgoing: {
                    outgoingTitle: '',
                    outgoingAmount: 0,
                    outgoingCategoryId: null,
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
    currency: getCurrency(state),
    categories: getCategories(state),
});

const actions = {
    ...outgoingActions,
    ...budgetActions,
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewOutgoingComponent);