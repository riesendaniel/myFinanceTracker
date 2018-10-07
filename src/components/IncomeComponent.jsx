import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
  getIsLoading, getGrossPay, getNetPay,
} from '../redux/modules/IncomeReducer';
import Loading from './LoadingComponent';
import IncomeGrossPay from './IncomeGrossPayComponent';
import IncomeDeductions from './IncomeDeductionsComponent';

class IncomeComponent extends Component {
  componentDidMount = async () => {
    const {
      doLoadIncome,
    } = this.props;
    await doLoadIncome();
  }

  render = () => {
    const {
      isLoading,
      currency,
      netPay,
    } = this.props;
    return (
      <Paper>
        <Typography variant="headline" component="h2">Einkommen</Typography>
        { isLoading ? <Loading /> : (
          <div>
            <IncomeGrossPay />
            <IncomeDeductions />
            <div>
              {`Nettoeinkommen ${Math.round(netPay)} ${currency}`}
            </div>
          </div>
        ) }
      </Paper>
    );
  }
}

IncomeComponent.propTypes = {
  doLoadIncome: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  netPay: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  currency: getCurrency(state),
  grossPay: getGrossPay(state),
  netPay: getNetPay(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeComponent);
