import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  FormControl,
  Grid,
  IconButton,
  Input, InputAdornment,
  Typography,
} from '@material-ui/core';
import withWidth, {
  isWidthDown,
} from '@material-ui/core/withWidth';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
  getGrossPay,
} from '../redux/modules/IncomeReducer';

class IncomeGrossPayComponent extends Component {
  state = {
    grossPay: null,
    editGrossPay: false,
  };

  componentDidMount = async () => {
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
  }

  saveGrossPay = () => {
    const {
      doUpdateGrossPay,
    } = this.props;
    const {
      grossPay,
    } = this.state;
    doUpdateGrossPay(grossPay);
    this.setState({ editGrossPay: false });
  }

  render = () => {
    const {
      grossPay,
      editGrossPay,
    } = this.state;
    const {
      currency,
      width,
    } = this.props;
    const smDown = isWidthDown('sm', width);
    return (
      <Grid container alignItems="flex-end">
        <Grid item xs={12} container justify="space-between" alignItems="center" wrap="nowrap">
          <Typography color={smDown ? 'textSecondary' : undefined}>Bruttoeinkommen</Typography>
          <FormControl>
            <Input
              type="number"
              value={grossPay}
              onChange={event => this.setState({ grossPay: event.target.value })}
              endAdornment={
                <InputAdornment position="end">{currency}</InputAdornment>
              }
              disableUnderline={!editGrossPay}
              readOnly={!editGrossPay}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} container justify="flex-end">
          { editGrossPay ? (
            <div>
              <IconButton onClick={this.saveGrossPay}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={this.handleCancel}>
                <CancelIcon />
              </IconButton>
            </div>
          ) : (
            <IconButton onClick={() => this.setState({ editGrossPay: true })}>
              <EditIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    );
  }
}

IncomeGrossPayComponent.propTypes = {
  doUpdateGrossPay: PropTypes.func.isRequired,
  currency: PropTypes.func.isRequired,
  grossPay: PropTypes.number.isRequired,
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
  grossPay: getGrossPay(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withWidth()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeGrossPayComponent));
