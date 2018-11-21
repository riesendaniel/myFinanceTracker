import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';
import {
  Card, CardContent, CardActionArea, CardActions,
  Grid,
  Hidden,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import history from '../helper/history';
import { actions as outgoingActions } from '../redux/modules/OutgoingReducer';
import { getCurrency } from '../redux/modules/AppReducer';
import { actions as budgetActions, getCategories } from '../redux/modules/BudgetReducer';

class NewOutgoingComponent extends Component {
  static propTypes = {
    doAddOutgoing: PropTypes.func.isRequired,
    doUpdateOutgoing: PropTypes.func.isRequired,
    location: PropTypes.shape(PropTypes.object).isRequired,
    currency: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    outgoing: {
      outgoingTitle: '',
      outgoingAmount: 0,
      outgoingCategoryId: null,
      outgoingDate: moment(new Date())
        .format('YYYY-MM-DD'),
    },
  };

  componentDidMount = () => {
    const { location } = this.props;
    if (location.state && location.state.outgoing) {
      const { outgoing } = location.state;
      this.setState({
        outgoing: {
          id: outgoing.id,
          outgoingTitle: outgoing.outgoingTitle,
          outgoingAmount: outgoing.outgoingAmount,
          outgoingCategory: outgoing.outgoingCategory,
          outgoingDate: outgoing.outgoingDate,
          outgoingCategoryId: outgoing.outgoingCategoryId,
          outgoingCurrency: 'CHF',
        },
      });
    }
  };

  handleCancel = () => {
    history.push({
      pathname: '/outgoings/',
    });
  };

  addOutgoing = (event) => {
    event.preventDefault();
    try {
      const {
        doUpdateOutgoing,
        doAddOutgoing,
      } = this.props;
      const { outgoing } = this.state;
      if (outgoing.id) {
        doUpdateOutgoing(outgoing);
      } else {
        doAddOutgoing(outgoing);
      }
      this.setState({
        outgoing: {
          outgoingTitle: '',
          outgoingAmount: 0,
          outgoingCategoryId: null,
          outgoingDate: '',
          outgoingCurrency: '',
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { currency, categories } = this.props;
    const { outgoing } = this.state;
    return (
      <Grid container spacing={16} justify="center">
        <Hidden smDown>
          <Grid item sm={2} md={3} xl={4} />
        </Hidden>
        <Grid xs={12} sm={8} md={6} xl={4}>
          <Typography variant="headline" component="h2">Ausgabe erfassen</Typography>
        </Grid>
        <Hidden smDown>
          <Grid item sm={2} md={3} xl={4} />
        </Hidden>
        <Grid xs={12} sm={8} md={6} xl={4}>
          <Card>
            <form onSubmit={this.addOutgoing}>
              <CardContent>
                <Grid item xs={12} container spacing={16} justify="space-between">
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outgoing-title"
                      name="outgoingTitle"
                      type="text"
                      placeholder="Titel eingeben"
                      autoComplete="on"
                      value={outgoing.outgoingTitle}
                      onChange={(event) => {
                        this.setState({
                          outgoing: { ...outgoing, outgoingTitle: event.target.value },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="amount">Betrag</InputLabel>
                      <Input
                        id="amount"
                        type="number"
                        value={outgoing.outgoingAmount}
                        onChange={(event) => {
                          this.setState({
                            outgoing: {
                              ...outgoing,
                              outgoingAmount: Number(event.target.value),
                            },
                          });
                        }}
                        startAdornment={
                          <InputAdornment position="start">{currency}</InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="group-select">Kategorie auswählen</InputLabel>
                      <Select
                        value={outgoing.outgoingCategoryId || ''}
                        onChange={(event) => {
                          this.setState({
                            outgoing: { ...outgoing, outgoingCategoryId: event.target.value },
                          });
                        }}
                        inputProps={{
                          name: 'group',
                          id: 'group-select',
                        }}
                      >
                        { categories.map(category => (
                          <MenuItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.description}
                          </MenuItem>
                        )) }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outgoing-date"
                      name="outgoingDate"
                      placeholder="Datum auswählen"
                      autoComplete="on"
                      type="date"
                      value={outgoing.outgoingDate}
                      onChange={(event) => {
                        this.setState({
                          outgoing: { ...outgoing, outgoingDate: event.target.value },
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActionArea>
                <CardActions>
                  <IconButton
                    type="submit"
                    variant="contained"
                    aria-label="add outgoing"
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={this.handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </CardActions>
              </CardActionArea>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
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

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewOutgoingComponent);
