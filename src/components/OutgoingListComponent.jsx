import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {Route} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Loading from './LoadingComponent';
import OutgoingItemComponent from "./OutgoingItemComponent";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as budgetActions, getCategories, getIsLoading as getBudgetIsLoading } from '../redux/modules/BudgetReducer';
import { actions as outgoingActions, getOutgoings, getIsLoading as getOutgoingIsLoading } from '../redux/modules/OutgoingReducer';
import OutgoingSummaryComponent from "./OutgoingSummaryComponent";

class OutgoingListComponent extends Component {

    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        outgoings: PropTypes.array.isRequired,
        categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    async componentDidMount() {
        const {doLoadOutgoings, doLoadBudget} = this.props;
        await doLoadBudget();
        await doLoadOutgoings();
    }

    render() {
        const { outgoings, isLoading, categories } = this.props;
        return (
            <Paper>
                <h2>Ausgaben</h2>

                {isLoading ? <Loading/> : (
                    <div>
                        <Route render={({history}) => (
                            <IconButton type='button' onClick={() => {
                                history.push('/outgoing/edit')
                            }}> <AddIcon/></IconButton>
                        )}/>


                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Titel</TableCell>
                                    <TableCell>Datum</TableCell>
                                    <TableCell>Kategorie</TableCell>
                                    <TableCell>Betrag</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {outgoings.map(row => {
                                    const category = categories.filter(item => item.id === row.outgoingCategoryId);
                                    if (category.length > 0) {
                                        row.outgoingCategory = category[0].description;
                                    }
                                    return (
                                        <OutgoingItemComponent key={row.id} outgoing={row}/>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <OutgoingSummaryComponent outgoings={outgoings} />
                    </div>
                )}
            </Paper>
        );
    }

}


const mapStateToProps = state => ({
    isLoading: getOutgoingIsLoading(state) || getBudgetIsLoading(state),
    outgoings: getOutgoings(state),
    categories: getCategories(state),
});

const actions = {
    ...budgetActions,
    ...outgoingActions,
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutgoingListComponent);






