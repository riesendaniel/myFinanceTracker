import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import {
  Card, CardContent, CardActions,
  Grid,
  Hidden,
  FormControl,
  InputAdornment,
  MenuItem,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import history from '../helper/history';
import FormActions from './FormActionsComponent';
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

  addOutgoing = async (event) => {
    event.preventDefault();
    const {
      doUpdateOutgoing,
      doAddOutgoing,
    } = this.props;
    const { outgoing } = this.state;
    if (outgoing.id) {
      await doUpdateOutgoing(outgoing);
    } else {
      await doAddOutgoing(outgoing);
    }
  };

  render() {
    const { currency, categories } = this.props;
    const { outgoing } = this.state;
    return (
      <Grid container spacing={gridSpacing} justify="center">
        <Hidden smDown>
          <Grid item sm={2} md={3} xl={4}/>
        </Hidden>
        <Grid item xs={12} sm={8} md={6} xl={4}>
          <Typography variant="h2" data-test-id={'title-new-outgoing'} component="h2">Ausgabe erfassen</Typography>
        </Grid>
        <Hidden smDown>
          <Grid item sm={2} md={3} xl={4}/>
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
                      data-test-id={'outgoing-title'}
                      name="outgoingTitle"
                      type="text"
                      placeholder="Titel eingeben"
                      validators={[
                        'required',
                        'isString',
                        'minStringLength:3',
                        'maxStringLength:100',
                      ]}
                      errorMessages={[
                        'Der Titel muss ausgefüllt werden.',
                        'Der Titel muss in Form eines Textes erfasst werden.',
                        'Der Titel muss aus mindestens drei Zeichen bestehen.',
                        'Der Titel darf maximal 100 Zeichen beinhalten.',
                      ]}
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
                        data-test-id={'outgoing-amount'}
                        name="amount"
                        placeholder="Betrag eingeben"
                        validators={[
                          'required',
                          'minNumber:-999999',
                          'maxNumber:999999',
                        ]}
                        errorMessages={[
                          'Ein Betrag muss eingegeben werden.',
                          `Der eingegebene Betrag darf -999'999 ${currency} nicht unterschreiten.`,
                          `Der eingegebene Betrag darf 999'999 ${currency} nicht überschreiten.`,
                        ]}
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
                        data-test-id={'outgoing-category'}
                        name="category"
                        validators={['required']}
                        errorMessages={['Die Ausgabe muss einer Kategorie zugewiesen werden. Ggf. muss vorgängig ein Budgeteintrag erfasst werden.']}
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
                        {categories.map(category => (
                          <MenuItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.description}
                          </MenuItem>
                        ))}
                      </SelectValidator>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      fullWidth
                      id="outgoing-date"
                      name="outgoingDate"
                      data-test-id={'outgoing-date'}
                      validators={['required']}
                      errorMessages={['Ein Datum muss ausgewählt werden.']}
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
              <CardActions>
                <FormActions
                  editable
                  resetFnc={() => this.handleCancel()}
                />
              </CardActions>
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
