import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Loading from './LoadingComponent';
import OutgoingItemComponent from './OutgoingItemComponent';
import TablePagination from '@material-ui/core/TablePagination';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  actions as budgetActions,
  getCategories,
  getIsLoading as getBudgetIsLoading
} from '../redux/modules/BudgetReducer';
import {
  actions as outgoingActions,
  getIsLoading as getOutgoingIsLoading,
  getOutgoings
} from '../redux/modules/OutgoingReducer';
import OutgoingSummaryComponent from './OutgoingSummaryComponent';

class OutgoingListComponent extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    outgoings: PropTypes.array.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    rowsPerPage: 1,
    page: 0,
    order: 'asc',
    orderBy: 'calories',
    selected: [],
  };

  async componentDidMount() {
    const { doLoadOutgoings, doLoadBudget } = this.props;
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
            <Route render={({ history }) => (
              <IconButton type='button' onClick={() => {
                history.push('/outgoing/edit');
              }}> <AddIcon/></IconButton>
            )}/>


            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titel</TableCell>
                  <TableCell>Datum</TableCell>
                  <TableCell>Kategorie</TableCell>
                  <TableCell>Betrag</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <EnhancedTableHead
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={outgoings.length}
              />
              <TableBody>
                {outgoings.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                  .map(row => {
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

            <TablePagination
              component="div"
              count={outgoings.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />

            <OutgoingSummaryComponent outgoings={outgoings}/>
          </div>
        )}
      </Paper>
    );
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({
      order,
      orderBy
    });
  };

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






