import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BottomNavigation, BottomNavigationAction,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import Loading from './LoadingComponent';
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
      grossPay,
      netPay,
    } = this.props;

    return (
      <Paper>
        <Typography variant="headline" component="h2">Einkommen</Typography>
        { isLoading ? <Loading /> : (
          <div>
            <div>
              {`Bruttoeinkommen ${grossPay} CHF`}
              <IconButton>
                <EditIcon />
              </IconButton>
            </div>
            <IncomeDeductions />
            <div>
              {`Nettoeinkommen ${Math.round(netPay)} CHF`}
            </div>
            <BottomNavigation
              showLabels
            >
              <BottomNavigationAction value="addIncomeDeduction" label="Lohnabzug hinzufügen" icon={<AddCircleIcon />} />
            </BottomNavigation>
          </div>
        ) }
      </Paper>
    );
  }
}

IncomeComponent.propTypes = {
  doLoadIncome: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  grossPay: PropTypes.number.isRequired,
  netPay: PropTypes.number.isRequired,
};

export default IncomeComponent;
