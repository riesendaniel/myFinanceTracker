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
import OutgoingTableHead from './OutgoingTableHead';
import {
  getCategories,
  getIsLoading as getBudgetIsLoading,
} from '../redux/modules/BudgetReducer';
import {
  actions,
  getIsLoading as getOutgoingIsLoading,
  getOutgoings,
  getMostFrequentCategory,
} from '../redux/modules/OutgoingReducer';
import { gridSpacing } from '../theme';

class OutgoingListComponent extends Component {
  static propTypes = {
    isLoadingOutgoings: PropTypes.bool.isRequired,
    isLoadingBudget: PropTypes.bool.isRequired,
    outgoings: PropTypes.arrayOf(CustomPropTypes.outgoing).isRequired,
    categories: PropTypes.arrayOf(CustomPropTypes.category).isRequired,
    mostFrequentCategory: PropTypes.string.isRequired,
  };

  state = {
    rowsPerPage: 5,
    page: 0,
    order: 'desc',
    searchValue: '',
    orderBy: 'outgoingDate',
    filterValue: null,
  };

  getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  }

  filterTable = (array) => {
    const {
      filterValue,
      searchValue,
    } = this.state;
    const newArray = !filterValue ? array : array.filter(o => o.outgoingCategoryId === filterValue);
    if (searchValue !== '' || filterValue) {
      return newArray.filter(o => o.outgoingTitle.toLowerCase()
        .includes(searchValue.toLowerCase()) || moment(o.outgoingDate)
        .format('DD.MM.YYYY').includes(searchValue.toLowerCase()));
    }
    return newArray;
  }

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  handleSearch = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRequestSort = (event, property) => {
    const newOrderBy = property;
    let newOrder = 'desc';
    const {
      orderBy,
      order,
    } = this.state;

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }

    this.setState({
      order: newOrder,
      orderBy: newOrderBy,
    });
  };

  getFilterCategories = (outgoings) => {
    const list = [];
    outgoings.forEach((outgoing) => {
      list.push(outgoing.outgoingCategoryId);
    });
    return [...new Set(list)];
  }

  getCategoryById = (categories, id) => {
    const desc = categories.find(x => x.id === id);
    if (desc) {
      return desc.description;
    }
  }

  render() {
    const {
      outgoings,
      isLoadingOutgoings,
      isLoadingBudget,
      categories,
      mostFrequentCategory,
    } = this.props;
    const {
      filterValue,
      order,
      orderBy,
      page,
      rowsPerPage,
      searchValue,
    } = this.state;
    return (
      <Grid container spacing={gridSpacing} justify="center">
        <Grid item xs={12} md={10}>
          <Typography variant="h2" component="h2">Ausgaben</Typography>
        </Grid>
        {isLoadingOutgoings || isLoadingBudget ? <Loading /> : (
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
                        value={searchValue}
                      />
                    </Grid>
                    <Grid item xs={10} sm={5}>
                      <InputLabel htmlFor="category-select">Kategorie filtern:</InputLabel>
                      <Select
                        value={filterValue || ''}
                        onChange={(event) => {
                          this.setState({ filterValue: event.target.value });
                        }}
                        inputProps={{
                          id: 'category-select',
                        }}
                      >
                        {this.getFilterCategories(outgoings).map(id => (
                          <MenuItem key={id} value={id}>
                            {this.getCategoryById(categories, id)}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <IconButton
                        type="button"
                        onClick={() => this.setState({ filterValue: null, searchValue: '' })}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <ResponsiveTable breakpoint="sm">
                      <OutgoingTableHead
                        breakpoint="sm"
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                      />
                      <ResponsiveTableBody>
                        {this.filterTable(this.stableSort(
                          outgoings,
                          this.getSorting(order, orderBy),
                        ))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => {
                            const category = categories.filter(
                              item => item.id === row.outgoingCategoryId,
                            );
                            if (category.length > 0) {
                              row.outgoingCategory = category[0].description;
                            }
                            return (
                              <OutgoingItemComponent key={row.id} outgoing={row} />
                            );
                          })}
                      </ResponsiveTableBody>
                      <OutgoingSummaryComponent outgoings={this.filterTable(outgoings)} />
                    </ResponsiveTable>
                    <ResponsiveTablePagination
                      breakpoint="xs"
                      component="div"
                      count={this.filterTable(outgoings).length}
                      rowsPerPage={rowsPerPage}
                      page={page}
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
              <Button
                variant="fab"
                color="primary"
                type="button"
                onClick={() => {
                  history.push({
                    pathname: '/outgoing/edit',
                    state: { mostFrequentCategory },
                  });
                }}
              >
                <AddIcon />
              </Button>
            )}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}


const mapStateToProps = state => ({
  isLoadingOutgoings: getOutgoingIsLoading(state),
  isLoadingBudget: getBudgetIsLoading(state),
  outgoings: getOutgoings(state),
  categories: getCategories(state),
  mostFrequentCategory: getMostFrequentCategory(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OutgoingListComponent);
