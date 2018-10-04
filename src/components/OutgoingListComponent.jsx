import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {Route} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Loading from './LoadingComponent';
import OutgoingItemComponent from "./OutgoingItemComponent";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, getOutgoings, getIsLoading} from '../redux/modules/OutgoingReducer';

class OutgoingListComponent extends Component {

    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        outgoings: PropTypes.array.isRequired,
    };

    async componentDidMount() {
        const {doLoadOutgoings} = this.props;
        await doLoadOutgoings();
    }

    render() {
        return (
            <Paper>
                <h2>Ausgaben</h2>

                {this.props.isLoading ? <Loading/> : (
                    <div>
                        <Route render={({history}) => (
                            <Button type='button' onClick={() => {
                                history.push('/outgoing/edit')
                            }}> <AddIcon/></Button>
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
                                {this.props.outgoings.map(row => {
                                    return (
                                        <OutgoingItemComponent key={row.id} outgoing={row}/>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </Paper>
        );
    }

}


const mapStateToProps = state => ({
    isLoading: getIsLoading(state),
    outgoings: getOutgoings(state)
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actions, dispatch);
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutgoingListComponent);






