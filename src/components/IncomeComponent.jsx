import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card, CardContent,
  Grid,
  Hidden,
  Typography,
  withStyles,
} from '@material-ui/core';
import withWidth, {
  isWidthDown,
} from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
  getIsLoading,
  getGrossPay, getNetPay, getTotalDeductions,
} from '../redux/modules/IncomeReducer';
import Loading from './LoadingComponent';
import IncomeGrossPay from './IncomeGrossPayComponent';
import IncomeDeductions from './IncomeDeductionsComponent';
import { gridSpacing } from '../theme';

const spacing = 48;

const styles = () => ({
  grossPay: {
    marginBottom: `${spacing}px`,
  },
  netPay: {
    marginTop: `${spacing / 2}px`,
  },
  totalDeductions: {
    marginTop: `${spacing}px`,
  },
});

const IncomeComponent = (props) => {
  const {
    classes,
    isLoadingIncome,
    currency,
    netPay,
    totalDeductions,
    width,
  } = props;
  const smDown = isWidthDown('sm', width);

  return (
    <Grid container spacing={gridSpacing} justify="center">
      <Hidden smDown>
        <Grid item md={2} xl={3} />
      </Hidden>
      <Grid item xs={12} md={8} xl={6}>
        <Typography variant="headline" component="h2">Einkommen</Typography>
      </Grid>
      <Hidden smDown>
        <Grid item md={2} xl={3} />
      </Hidden>
      { isLoadingIncome ? <Loading /> : (
        <Grid item xs={12} md={8} xl={6} container>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container direction="row-reverse" justify="flex-end">
                  <Grid item xs={12} className={classes.grossPay}>
                    <IncomeGrossPay />
                  </Grid>
                  <Grid item xs={12}>
                    <IncomeDeductions />
                  </Grid>
                  <Grid item xs={12} md={9} lg={10} container justify="space-between" alignItems="center" className={classes.totalDeductions}>
                    <Typography color={smDown ? 'textSecondary' : undefined}>Total Abzüge</Typography>
                    <Typography>{`${Math.round(totalDeductions)} ${currency}`}</Typography>
                  </Grid>
                  <Grid item xs={12} md={9} lg={10} container justify="space-between" alignItems="center" className={classes.netPay}>
                    <Typography color={smDown ? 'textSecondary' : undefined}>Nettoeinkommen</Typography>
                    <Typography>{`${Math.round(netPay)} ${currency}`}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) }
    </Grid>
  );
};

IncomeComponent.propTypes = {
  classes: CustomPropTypes.classes.isRequired,
  isLoadingIncome: PropTypes.bool.isRequired,
  currency: CustomPropTypes.currency.isRequired,
  netPay: PropTypes.number,
  totalDeductions: PropTypes.number.isRequired,
  width: CustomPropTypes.breakpoint.isRequired,
};

IncomeComponent.defaultProps = {
  netPay: 0,
};

const mapStateToProps = state => ({
  isLoadingIncome: getIsLoading(state),
  currency: getCurrency(state),
  grossPay: getGrossPay(state),
  netPay: getNetPay(state),
  totalDeductions: getTotalDeductions(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithWidth = withWidth()(IncomeComponent);
const componentWithStyles = withStyles(styles)(componentWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
