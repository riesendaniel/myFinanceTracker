import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import moment from 'moment';
import {
  Button, IconButton,
  Card, CardContent,
  Grid,
  TextField,
  Select,
  MenuItem, InputLabel,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTable,
  ResponsiveTableBody,
  ResponsiveTablePagination,
} from './ResponsiveTable';
import Loading from './LoadingComponent';
import OutgoingSummaryComponent from './OutgoingSummaryComponent';
import OutgoingItemComponent from './OutgoingItemComponent';
import RedirectComponent from './RedirectComponent'
import OutgoingTableHead from './OutgoingTableHead';
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
import { auth } from '../config/firebase';
import { gridSpacing } from '../theme';

class OutgoingListComponent extends Component {

  static propTypes = {
    isLoadingOutgoings: PropTypes.bool.isRequired,
    isLoadingBudget: PropTypes.bool.isRequired,
    outgoings: PropTypes.arrayOf(CustomPropTypes.outgoing).isRequired,
    categories: PropTypes.arrayOf(CustomPropTypes.category).isRequired,
  };

  state = {
    rowsPerPage: 5,
    page: 0,
    order: 'desc',
    searchValue: '',
    filterData: [],
    orderBy: 'outgoingDate',
    selected: [],
    filterValue: null,
  };

  async componentDidMount() {
    const { doLoadOutgoings, doLoadBudget } = this.props;
    if(auth.currentUser){
      await doLoadBudget();
      await doLoadOutgoings();
    }
  }

  render() {
    const { outgoings, isLoadingOutgoings, isLoadingBudget, categories } = this.props;
    return (
      <Grid container spacing={gridSpacing} justify="center">
        <RedirectComponent/>
        <Grid item xs={12} md={10}>
          <Typography variant="headline" component="h2">Ausgaben</Typography>
        </Grid>
        {isLoadingOutgoings || isLoadingBudget ? <Loading/> : (
          <Grid item xs={12} md={10} container>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid item xs={12} container spacing={gridSpacing}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        placeholder="Nach einem Inhalt suchen.."
                        onChange={this.handleSearch}
                        value={this.state.searchValue}
                      />
                    </Grid>
                    <Grid item xs={10} sm={5}>
                      <InputLabel htmlFor="category-select">Kategorie filtern:</InputLabel>
                      <Select value={this.state.filterValue || ''} onChange={(event) => {
                        this.setState({ filterValue: event.target.value } );
                      }} inputProps={{
                        id: 'category-select',
                      }}>
                        { outgoings.map(outgoing => <MenuItem key={outgoing.id} value={outgoing.outgoingCategoryId}>{outgoing.outgoingCategoryId}</MenuItem>) }
                      </Select>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <IconButton
                        type="button"
                        onClick={() => this.setState({ filterValue: null, searchValue: ''  })}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <ResponsiveTable breakpoint="sm">
                      <OutgoingTableHead breakpoint="sm"
                        order={this.state.order}
                        orderBy={this.state.orderBy}
                        onRequestSort={this.handleRequestSort}
                      />
                      <ResponsiveTableBody>
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
                      </ResponsiveTableBody>
                      <OutgoingSummaryComponent outgoings={this.filterTable(outgoings)}/>
                    </ResponsiveTable>
                    <ResponsiveTablePagination
                      breakpoint="xs"
                      component="div"
                      count={this.filterTable(outgoings).length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      labelRowsPerPage="Einträge pro Seite"
                      labelDisplayedRows={({ from, to, count }) => `zeige ${from} bis ${to} von total ${count} Einträgen`}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Route render={({ history }) => (
              <Button variant="fab" color="primary" type='button' onClick={() => {
                const mostFrequentCategory = this.getMostFrequentCategory(outgoings);
                history.push({
                  pathname: '/outgoing/edit',
                  state: { mostFrequentCategory },
                });
              }}> <AddIcon/></Button>
            )}/>
          </Grid>
        )}
      </Grid>
    );
  }

  getMostFrequentCategory(arr) {
    let currHighest = 0;
    let anzahlElement = 0;
    let currItem;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i; j < arr.length; j++) {
        if (arr[i].outgoingCategoryId === arr[j].outgoingCategoryId) {
          anzahlElement++;
        }
        if (currHighest < anzahlElement) {
          currHighest = anzahlElement;
          currItem = arr[i].outgoingCategoryId;
        }
      }
      anzahlElement = 0;
    }
    return currItem;
  }

  handleSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  filterTable(array) {
    const newArray = !this.state.filterValue ? array : array.filter(o => o.outgoingCategoryId ===
      this.state.filterValue);
    if (this.state.searchValue !== '' || this.state.filterValue) {
      return newArray.filter(o => o.outgoingTitle.toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) || moment(o.outgoingDate)
        .format('DD.MM.YYYY').includes(this.state.searchValue.toLowerCase()));
    }
    return newArray;
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
  isLoadingOutgoings: getOutgoingIsLoading(state),
  isLoadingBudget: getBudgetIsLoading(state),
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
