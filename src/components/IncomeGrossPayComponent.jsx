import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  FormControl,
  IconButton,
  Input, InputAdornment,
} from '@material-ui/core';
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
    } = this.props;
    return (
      <div>
        <span>Bruttoeinkommen</span>
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
      </div>
    );
  }
}

IncomeGrossPayComponent.propTypes = {
  doUpdateGrossPay: PropTypes.func.isRequired,
  currency: PropTypes.func.isRequired,
  grossPay: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
  grossPay: getGrossPay(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeGrossPayComponent);
