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
  withStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import MoneyIcon from '@material-ui/icons/Money';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import stableSort from '../helper/sorting';
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

const styles = () => ({
  blankIcon: {
    fontSize: '10rem',
    opacity: 0.25,
  },
  blankText: {
    width: '75%',
  },
});

class OutgoingListComponent extends Component {
  static propTypes = {
    isLoadingOutgoings: PropTypes.bool.isRequired,
    isLoadingBudget: PropTypes.bool.isRequired,
    classes: CustomPropTypes.classes.isRequired,
    outgoings: PropTypes.arrayOf(CustomPropTypes.outgoing).isRequired,
    categories: PropTypes.arrayOf(CustomPropTypes.category).isRequired,
    mostFrequentCategory: PropTypes.string,
  };

  static defaultProps = {
    mostFrequentCategory: undefined,
  };

  state = {
    rowsPerPage: 10,
    page: 0,
    order: 'desc',
    searchValue: '',
    orderBy: 'outgoingDate',
    filterValue: null,
  };

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

    const isDataReadyToRender = () => {
      const {
        isLoadingBudget,
        isLoadingOutgoings,
        classes,
      } = this.props;
      if (isLoadingBudget || isLoadingOutgoings) {
        return <Loading />;
      }
      if (outgoings.length === 0) {
        return (
          <Card>
            <CardContent>
              <Grid container justify="center">
                <MoneyIcon className={classes.blankIcon} />
                <Typography className={classes.blankText} align="center">
                  {`Damit an dieser Stelle die vergangenen Ausgaben aufgelistet 
                  werden, muss mindestens ein Budgeteintrag erfasst werden.
                  Dazu kann die Schaltfläche unten rechts verwendet werden.`}
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        );
      }
      return false;
    };

    return (
      <Grid container spacing={gridSpacing} justify="center">
        <Grid item xs={12} md={10}>
          <Typography variant="h2" component="h2">Ausgaben</Typography>
        </Grid>
        {isDataReadyToRender() || (
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
                        {this.filterTable(stableSort(
                          outgoings,
                          orderBy,
                          order,
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
          </Grid>
        )}
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

const ComponentWithStyles = withStyles(styles)(OutgoingListComponent);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentWithStyles);
