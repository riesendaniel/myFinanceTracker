import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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
import { gridSpacing } from '../theme';

const spacing = '48px';

const styles = () => ({
  grossPay: {
    marginBottom: spacing,
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
    const smDown = isWidthDown('sm', width);

    if (!auth.currentUser) {
      return <Redirect to="/signin/" />;
    }

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
