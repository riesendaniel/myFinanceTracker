import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ValidatorForm,
  TextValidator,
  SelectValidator,
} from 'react-material-ui-form-validator';
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  withStyles,
} from '@material-ui/core';
import withWidth, {
  isWidthUp,
} from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTableRow, ResponsiveTableCell,
  ResponsiveTableRowFormCell,
} from './ResponsiveTable';
import FormActions from './FormActionsComponent';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
} from '../redux/modules/IncomeReducer';

const styles = () => ({
  form: {
    width: '100%',
  },
  value: {
    maxWidth: '150px',
  },
  editAmount: {
    display: 'inline-block',
    width: '145px',
    textAlign: 'end',
  },
  typeInput: {
    maxWidth: '70px',
  },
  valueInput: {
    maxWidth: '75px',
  },
  actions: {
    width: '100px',
  },
});

class IncomeDeductionsItemComponent extends Component {
  state = {
    deduction: {},
    editable: false,
    focus: null,
  }

  componentDidMount = () => {
    const {
      deduction,
      editable,
    } = this.props;
    this.initialDeduction = { ...deduction };
    this.initialEditable = editable;
    let focus = null;
    if (editable) {
      focus = 'description';
    }
    this.setState({ deduction, editable, focus });
  }

  handleInputChange = (event) => {
    const { deduction } = this.state;
    const { name, value } = event.target;
    event.preventDefault();
    const newDeduction = { ...deduction };
    if (value.length > 0 && isNaN(value)) {
      newDeduction[name] = String(value);
    } else if (value.length > 0 && !isNaN(value)) {
      newDeduction[name] = Number(value);
    } else {
      newDeduction[name] = value;
    }
    this.setState({ deduction: newDeduction, focus: name });
  }

  resetDeduction = () => {
    this.setState({
      deduction: { ...this.initialDeduction },
      editable: this.initialEditable,
      focus: null,
    });
  }

  saveDeduction = () => {
    const {
      doAddDeduction,
      doUpdateDeduction,
    } = this.props;
    const {
      deduction,
    } = this.state;
    if (deduction.id !== 'new') {
      doUpdateDeduction(deduction).then(this.setState({
        editable: this.initialEditable,
        focus: null,
      }));
    } else {
      doAddDeduction(deduction).then(this.setState({
        deduction: this.initialDeduction,
        editable: this.initialEditable,
        focus: null,
      }));
    }
  }

  deleteDeduction = async (id) => {
    const {
      doDeleteDeduction,
    } = this.props;
    await doDeleteDeduction(id);
  }

  render = () => {
    const {
      deduction,
      editable,
      focus,
    } = this.state;
    const {
      breakpoint,
      classes,
      currency,
      width,
    } = this.props;
    const breakpointUp = isWidthUp(breakpoint, width, false);
    return (
      <ResponsiveTableRow key={deduction.id} breakpoint={breakpoint}>
        <ResponsiveTableCell>
          <ValidatorForm className={classes.form} onSubmit={this.saveDeduction}>
            <Grid container justify="space-between" alignItems="center">
              <ResponsiveTableRowFormCell
                breakpoint={breakpoint}
                columnHead="Beschreibung"
              >
                <FormControl>
                  <TextValidator
                    autoFocus={focus === 'description'}
                    name="description"
                    placeholder="Beschreibung"
                    type="text"
                    value={deduction.description}
                    onChange={event => this.handleInputChange(event)}
                    InputProps={{
                      disableUnderline: !editable,
                      readOnly: !editable,
                    }}
                    validators={[
                      'required',
                      'minStringLength:3',
                    ]}
                    errorMessages={[
                      'Die Bezeichnung muss ausgefüllt werden.',
                      'Die Bezeichnung muss aus mindestens drei Zeichen bestehen.',
                    ]}
                  />
                </FormControl>
              </ResponsiveTableRowFormCell>
              <ResponsiveTableRowFormCell
                breakpoint={breakpoint}
                className={breakpointUp ? classes.value : undefined}
                columnHead="Betrag"
              >
                <FormControl className={classes.editAmount}>
                  <TextValidator
                    autoFocus={focus === 'value'}
                    className={classes.valueInput}
                    name="value"
                    type="number"
                    value={deduction.value}
                    onChange={event => this.handleInputChange(event)}
                    InputProps={{
                      endAdornment: editable ? undefined : (
                        <InputAdornment position="end">{deduction.type === 'percentaged' ? '%' : currency}</InputAdornment>
                      ),
                      disableUnderline: !editable,
                      readOnly: !editable,
                    }}
                    validators={[
                      'required',
                      'isPositive',
                    ]}
                    errorMessages={[
                      'Ein Betrag muss eingegeben werden.',
                      'Nur positive Beträge sind erlaubt.',
                    ]}
                  />
                  { editable && (
                    <SelectValidator
                      autoFocus={focus === 'type'}
                      className={classes.typeInput}
                      name="type"
                      value={deduction.type}
                      validators={['required']}
                      errorMessages={['Ein Typ muss ausgewählt werden.']}
                      onChange={event => this.handleInputChange(event)}
                    >
                      <MenuItem value="percentaged">%</MenuItem>
                      <MenuItem value="fixed">{currency}</MenuItem>
                    </SelectValidator>
                  )}
                </FormControl>
              </ResponsiveTableRowFormCell>
              <ResponsiveTableRowFormCell
                breakpoint={breakpoint}
                className={breakpointUp ? classes.actions : undefined}
                alignRight
              >
                <FormActions
                  editable={editable}
                  deleteFnc={() => this.deleteDeduction(deduction.id)}
                  editFnc={() => this.setState({ editable: true })}
                  resetFnc={() => this.resetDeduction()}
                />
              </ResponsiveTableRowFormCell>
            </Grid>
          </ValidatorForm>
        </ResponsiveTableCell>
      </ResponsiveTableRow>
    );
  }
}

IncomeDeductionsItemComponent.propTypes = {
  doAddDeduction: PropTypes.func.isRequired,
  doUpdateDeduction: PropTypes.func.isRequired,
  doDeleteDeduction: PropTypes.func.isRequired,
  breakpoint: CustomPropTypes.breakpoint.isRequired,
  classes: CustomPropTypes.classes.isRequired,
  currency: CustomPropTypes.currency.isRequired,
  deduction: CustomPropTypes.deduction.isRequired,
  editable: PropTypes.bool,
  width: CustomPropTypes.breakpoint.isRequired,
};

IncomeDeductionsItemComponent.defaultProps = {
  editable: false,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithWidth = withWidth()(IncomeDeductionsItemComponent);
const componentWithStyles = withStyles(styles)(componentWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
