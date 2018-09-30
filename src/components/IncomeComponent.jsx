import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import Loading from './LoadingComponent';
import IncomeGrossPay from '../container/IncomeGrossPayContainer';
import IncomeDeductions from '../container/IncomeDeductionsContainer';

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
              {`Nettoeinkommen ${Math.round(netPay)} CHF`}
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
  netPay: PropTypes.number.isRequired,
};

export default IncomeComponent;
