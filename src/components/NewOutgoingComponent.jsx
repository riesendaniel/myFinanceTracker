import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaveIcon from '@material-ui/icons/Save';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {
  Card, CardContent, CardActionArea, CardActions,
  Grid,
  Hidden,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import history from '../helper/history';
import { actions } from '../redux/modules/OutgoingReducer';
import { getCurrency } from '../redux/modules/AppReducer';
import { getCategories } from '../redux/modules/BudgetReducer';
import { gridSpacing } from '../theme';

class NewOutgoingComponent extends Component {
  static propTypes = {
    doAddOutgoing: PropTypes.func.isRequired,
    doUpdateOutgoing: PropTypes.func.isRequired,
    location: CustomPropTypes.location.isRequired,
    currency: CustomPropTypes.currency.isRequired,
    categories: PropTypes.arrayOf(CustomPropTypes.category).isRequired,
  };

  state = {
    outgoing: {
      outgoingTitle: '',
      outgoingAmount: null,
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
    if (location.state && location.state.mostFrequentCategory) {
      this.setState({
        outgoing: {
          ...this.state.outgoing,
          outgoingCategoryId: location.state.mostFrequentCategory,
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
  };

  render() {
    const { currency, categories } = this.props;
    const { outgoing } = this.state;
    return (
      <Grid container spacing={gridSpacing} justify="center">
        <Hidden smDown>
          <Grid item sm={2} md={3} xl={4} />
        </Hidden>
        <Grid item xs={12} sm={8} md={6} xl={4}>
          <Typography variant="headline" component="h2">Ausgabe erfassen</Typography>
        </Grid>
        <Hidden smDown>
          <Grid item sm={2} md={3} xl={4} />
        </Hidden>
        <Grid item xs={12} sm={8} md={6} xl={4}>
          <Card>
            <ValidatorForm
              ref="form"
              onSubmit={this.addOutgoing}
            >
              <CardContent>
                <Grid item xs={12} container spacing={gridSpacing} justify="space-between">
                  <Grid item xs={12}>
                    <TextValidator
                      fullWidth
                      id="outgoing-title"
                      name="outgoingTitle"
                      type="text"
                      placeholder="Titel eingeben"
                      validators={['required']}
                      errorMessages={['Das ist ein Pflichtfeld']}
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
                      <TextValidator
                        id="amount"
                        name="amount"
                        placeholder="Betrag eingeben"
                        validators={['required']}
                        errorMessages={['Das ist ein Pflichtfeld']}
                        type="number"
                        value={outgoing.outgoingAmount || ''}
                        onChange={(event) => {
                          this.setState({
                            outgoing: {
                              ...outgoing,
                              outgoingAmount: Number(event.target.value),
                            },
                          });
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        }}

                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <SelectValidator
                        value={outgoing.outgoingCategoryId || ''}
                        id="category"
                        name="category"
                        validators={['required']}
                        errorMessages={['Das ist ein Pflichtfeld']}
                        helperText="Kategorie auswählen"
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
                      </SelectValidator>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      fullWidth
                      id="outgoing-date"
                      name="outgoingDate"
                      validators={['required']}
                      errorMessages={['Das ist ein Pflichtfeld']}
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
            </ValidatorForm>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currency: getCurrency(state),
  categories: getCategories(state).filter(category => !category.disabled),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewOutgoingComponent);
