import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import globalStyle from '../style';
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
      classes,
      isLoadingIncome,
      currency,
      netPay,
    } = this.props;

    if (!auth.currentUser) {
      return <Redirect to="/signin/"/>;
    }

    return (
      <Paper className={classes.paper}>
        <Typography variant="headline" component="h2">Einkommen</Typography>
        { isLoadingIncome ? <Loading /> : (
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <IncomeGrossPay />
            </Grid>
            <Grid item xs={12}>
              <IncomeDeductions />
            </Grid>
            <Grid item xs={12}>
              <Typography>{`Nettoeinkommen ${Math.round(netPay)} ${currency}`}</Typography>
            </Grid>
          </Grid>
        ) }
      </Paper>
    );
  }
}

IncomeComponent.propTypes = {
  doLoadIncome: PropTypes.func.isRequired,
  classes: PropTypes.shape(PropTypes.object).isRequired,
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

export default withStyles(globalStyle)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeComponent));
