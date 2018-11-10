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
import { Redirect } from 'react-router-dom';
import { auth } from '../config/firebase';

class IncomeComponent extends Component {
  componentDidMount = async () => {
    const {
      doLoadIncome,
    } = this.props;
    if (auth.currentUser) {
      await doLoadIncome();
    }
  }

  render = () => {
    const {
      isLoadingIncome,
      currency,
      netPay,
    } = this.props;

    if (!auth.currentUser) {
      return <Redirect to="/signin/"/>;
    }

    return (
      <Paper>
        <Typography variant="headline" component="h2">Einkommen</Typography>
        { isLoadingIncome ? <Loading /> : (
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
  isLoadingIncome: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoadingIncome: getIsLoading(state),
  currency: getCurrency(state),
  grossPay: getGrossPay(state),
  netPay: getNetPay(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeComponent);
