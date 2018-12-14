import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';
import {
  FormControl,
  Grid,
  InputAdornment,
  Typography,
  withStyles,
} from '@material-ui/core';
import withWidth, {
  isWidthDown,
} from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import FormActions from './FormActionsComponent';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
  getGrossPay,
} from '../redux/modules/IncomeReducer';

const styles = () => ({
  form: {
    width: '100%',
  },
});

class IncomeGrossPayComponent extends Component {
  state = {
    grossPay: null,
    editGrossPay: false,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentDidMount = () => {
    const {
      grossPay,
    } = this.props;
    this.setState({ grossPay });
  }

  handleCancel = () => {
    const {
      grossPay,
    } = this.props;
    this.setState({
      grossPay,
      editGrossPay: false,
    });
    this.formRef.current.resetValidations();
  }

  saveGrossPay = async () => {
    const {
      doUpdateGrossPay,
    } = this.props;
    const {
      grossPay,
    } = this.state;
    await doUpdateGrossPay(grossPay);
    this.setState({ editGrossPay: false });
  }

  render = () => {
    const {
      grossPay,
      editGrossPay,
    } = this.state;
    const {
      classes,
      currency,
      width,
    } = this.props;
    const smDown = isWidthDown('sm', width);
    return (
      <ValidatorForm ref={this.formRef} className={classes.form} onSubmit={this.saveGrossPay}>
        <Grid container>
          <Grid item xs={12} md={9} lg={10} container justify="space-between" alignItems="center" wrap="nowrap">
            <Typography color={smDown ? 'textSecondary' : undefined}>monatliches Bruttoeinkommen</Typography>
            <FormControl>
              <TextValidator
                ref={this.formRef}
                name="grossPay"
                type="number"
                value={grossPay || ''}
                onChange={event => this.setState({ grossPay: Number(event.target.value) })}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{currency}</InputAdornment>,
                  disableUnderline: !editGrossPay,
                  readOnly: !editGrossPay,
                }}
                validators={[
                  'required',
                  'isPositive',
                  'maxNumber:999999',
                ]}
                errorMessages={[
                  'Ein Betrag muss eingegeben werden.',
                  'Nur positive Beträge sind erlaubt.',
                  `Der eingegebene Betrag darf 999'999 ${currency} nicht überschreiten.`,
                ]}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} lg={2} container justify="flex-end">
            <FormActions
              editable={editGrossPay}
              disableDelete
              editFnc={() => this.setState({ editGrossPay: true })}
              resetFnc={() => this.handleCancel()}
            />
          </Grid>
        </Grid>
      </ValidatorForm>
    );
  }
}

IncomeGrossPayComponent.propTypes = {
  doUpdateGrossPay: PropTypes.func.isRequired,
  classes: CustomPropTypes.classes.isRequired,
  currency: CustomPropTypes.currency.isRequired,
  grossPay: PropTypes.number,
  width: CustomPropTypes.breakpoint.isRequired,
};

IncomeGrossPayComponent.defaultProps = {
  grossPay: 0,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
  grossPay: getGrossPay(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithStyles = withStyles(styles)(IncomeGrossPayComponent);

export default withWidth()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles));
