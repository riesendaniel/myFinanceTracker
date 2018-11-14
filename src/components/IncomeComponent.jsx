import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Card, CardContent,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import withWidth, {
  isWidthDown,
} from '@material-ui/core/withWidth';
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

const spacing = '48px';

const styles = () => ({
  grossPay: {
    marginBottom: spacing,
  },
  deductions: {
    order: -1,
  },
  netPay: {
    marginTop: spacing,
  },
});

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
      width,
    } = this.props;

    if (!auth.currentUser) {
      return <Redirect to="/signin/"/>;
    }

    return (
      <div>
        <Typography variant="headline" component="h2">Einkommen</Typography>
        { isLoadingIncome ? <Loading /> : (
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container direction="row-reverse" justify="flex-end">
                    <Grid item xs={12} md={6} className={classes.grossPay}>
                      <IncomeGrossPay />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.deductions}>
                      <IncomeDeductions />
                    </Grid>
                    <Grid item xs={12} md={6} container justify="space-between" alignItems="center" className={classes.netPay}>
                      <Typography color={isWidthDown('xs', width) ? 'textSecondary' : undefined}>Nettoeinkommen</Typography>
                      <Typography>{`${Math.round(netPay)} ${currency}`}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) }
      </div>
    );
  }
}

IncomeComponent.propTypes = {
  doLoadIncome: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoadingIncome: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  netPay: PropTypes.number.isRequired,
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
};

const mapStateToProps = state => ({
  isLoadingIncome: getIsLoading(state),
  currency: getCurrency(state),
  grossPay: getGrossPay(state),
  netPay: getNetPay(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithWidth = withWidth()(IncomeComponent);
const componentWithStyles = withStyles(styles)(componentWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
