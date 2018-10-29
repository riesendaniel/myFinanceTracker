import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Paper, Table, TableBody, } from '@material-ui/core';
import { Route } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Loading from './LoadingComponent';
import OutgoingItemComponent from './OutgoingItemComponent';
import OutgoingTableHead from './OutgoingTableHead';
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
import TextField from '@material-ui/core/TextField/TextField';
import moment from 'moment';

class OutgoingListComponent extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    outgoings: PropTypes.array.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    rowsPerPage: 5,
    page: 0,
    order: 'asc',
    searchValue: '',
    filterData: [],
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

            <TextField placeholder=".. suche .." onChange={this.handleSearch}
                       value={this.state.searchValue}/>

            <Table>
              <OutgoingTableHead
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={outgoings.length}
              />

              <TableBody>

                {this.filterTable(this.stableSort(outgoings, this.getSorting(this.state.order, this.state.orderBy)))
                  .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
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

  handleSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  filterTable(array) {
    if (this.state.searchValue !== '') {
      return array.filter(o => o.outgoingTitle.toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) || moment(o.outgoingDate)
        .format('DD.MM.YYYY').includes(this.state.searchValue.toLowerCase()));
    }
    return array;
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }


  getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  }

  desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
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






