import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/de';
import NotAuthorizedComponent from './NotAuthorizedComponent'
import {
Grid,
Typography,
} from '@material-ui/core';
import withWidth, {
isWidthDown,
} from '@material-ui/core/withWidth';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CompareIcon from '@material-ui/icons/Compare';
import MoneyIcon from '@material-ui/icons/Money';
import {
  ResponsiveContainer,
  CartesianGrid, XAxis, YAxis,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie,
  Cell,
  Label,
  Legend,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import stableSort from '../helper/sorting';
import {
  ResponsiveTable,
  ResponsiveTableHead, ResponsiveTableBody,
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';
import {
  getCurrency,
  getUserRole,
  getIsLoading as getUserRightsIsLoading,
} from '../redux/modules/AppReducer';
import {
  getIsLoading as getBudgetIsLoading,
  getBudget, getMonthlyBudgetSum,
} from '../redux/modules/BudgetReducer';
import {
  getIsLoading as getOutgoingIsLoading,
  getOutgoings,
  getCurrentMonthsOutgoingSum, getCurrentMonthsOutgoingsByCategory,
  getLastTwelveMonthsOutgoingSum,
} from '../redux/modules/OutgoingReducer';
import {
  getIsLoading as getIncomeIsLoading,
  getNetPay,
} from '../redux/modules/IncomeReducer';
import Loading from './LoadingComponent';
import history from '../helper/history';
import DashboardInfoComponent from './DashboardInfoComponent';
import DashboardChartComponent from './DashboardChartComponent';
import RedirectComponent from './RedirectComponent';
import { auth } from '../config/firebase';
import { gridSpacing } from '../theme';

moment.locale('de');

class DashboardComponent extends Component {
  handleAddOutgoing = () => {
    history.push('/outgoing/edit');
  };

  mergeBudgetAndOutgoings = (budget, outgoingsByCategory) => budget.map((entry) => {
    const outgoingSum = outgoingsByCategory.find(outgoing => outgoing.id === entry.id);
    const balance = {
      id: entry.id,
      category: entry.category,
      color: entry.color,
      budget: entry.monthly,
      outgoing: 0,
    };
    if (typeof outgoingSum !== 'undefined') {
      balance.outgoing = outgoingSum.amount;
    }
    return balance;
  });

  render = () => {
    const {
      isLoadingBudget,
      isLoadingIncome,
      isLoadingOutgoing,
      isLoadingUserRights,
      budget,
      userRole,
      currency,
      monthlyBudgetSum,
      netPay,
      outgoings,
      currentMonthsOutgoingSum,
      currentMonthsOutgoingsByCategory,
      lastTwelveMonthsOutgoingSum,
      width,
    } = this.props;
    const currentMonthsBalance = this.mergeBudgetAndOutgoings(
      budget, currentMonthsOutgoingsByCategory,
    );
    const currentMonth = moment().format('MMMM');
    const name = auth.currentUser ? auth.currentUser.displayName : '';
    const xsDown = isWidthDown('xs', width);
    const lastOutgoingsCount = xsDown ? 3 : 5;
    const isAdmin = 'admin' === userRole;

    return (
      <Grid container spacing={gridSpacing} justify="center">
        <RedirectComponent />
        <Grid item xs={12} xl={10}>
          <Typography variant="h2" component="h2">{`Übersicht von ${ name || 'anonym'}`}</Typography>
        </Grid>
        { isLoadingBudget || isLoadingIncome || isLoadingOutgoing || isLoadingUserRights ? <Loading /> : (

          <Grid item xs={12} xl={10} container spacing={gridSpacing}>
            <Grid container spacing={gridSpacing} item>
              <DashboardInfoComponent
                icon={<MoneyIcon />}
                title={`Ausgaben im ${currentMonth}`}
                value={`${Math.round(currentMonthsOutgoingSum)} ${currency}`}
              />
              <DashboardInfoComponent
                icon={<AttachMoneyIcon />}
                title={`Nettoeinkommen im ${currentMonth}`}
                value={`${Math.round(netPay)} ${currency}`}
              />
              <DashboardInfoComponent
                icon={<CompareIcon />}
                title={`Ersparnisse im ${currentMonth}`}
                value={`${Math.round(netPay - currentMonthsOutgoingSum)} ${currency}`}
              />
              <DashboardInfoComponent
                icon={<CompareIcon />}
                title="Budgetierte Ersparnisse"
                /* TODO: Dies geht von der Annahme aus,
                   dass im Budget nur Ausgaben erfasst werden. */
                value={`${Math.round(netPay - monthlyBudgetSum)} ${currency}`}
              />
              <DashboardInfoComponent
                icon={<AddIcon />}
                title="Ausgabe hinzufügen"
                value="neue Ausgabe hinzufügen"
                clickFn={this.handleAddOutgoing}
              />
            </Grid>
            { !isAdmin ? <NotAuthorizedComponent /> : (
            <Grid container spacing={gridSpacing} item>
              <DashboardChartComponent
                title={`Ausgaben im ${currentMonth} pro Kategorie`}
                content={(
                  <ResponsiveContainer>
                    <PieChart>
                      <Tooltip formatter={value => `${value} ${currency}`} />
                      <Pie
                        innerRadius={xsDown ? 55 : 100}
                        outerRadius={xsDown ? 80 : 140}
                        paddingAngle={4}
                        data={currentMonthsOutgoingsByCategory}
                        dataKey="amount"
                        nameKey="category"
                      >
                        {currentMonthsOutgoingsByCategory.map(entry => (
                          <Cell key={entry.id} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend
                        layout="vertical"
                        align={xsDown ? 'center' : 'right'}
                        verticalAlign={xsDown ? 'bottom' : 'middle'}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              />
              <DashboardChartComponent
                title={`Bilanz des Monats ${currentMonth}`}
                content={(
                  <ResponsiveContainer>
                    <BarChart
                      data={currentMonthsBalance}
                    >
                      <Tooltip formatter={value => `${value} ${currency}`} />
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <Bar name="Budget" dataKey="budget" fill="rgba(8, 61, 119, 0.75)" />
                      <Bar name="Ausgaben" dataKey="outgoing" fill="rgba(161, 7, 2, 0.75)" />
                      <XAxis
                        dataKey="category"
                        interval={0}
                        textAnchor="start"
                        height={1}
                        angle={-90}
                        tick={{ fill: 'rgba(0, 0, 0, 0.87)' }}
                        tickLine={false}
                        tickMargin={-15}
                        dx={-7}
                      />
                      <YAxis>
                        <Label
                          value={`Betrag [${currency}]`}
                          angle={-90}
                          position="insideBottomLeft"
                          offset={10}
                        />
                      </YAxis>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              />
              <DashboardChartComponent
                title="Ausgaben des vergangenen Jahres"
                content={(
                  <ResponsiveContainer>
                    <LineChart
                      data={lastTwelveMonthsOutgoingSum}
                    >
                      <Tooltip formatter={value => `${value} ${currency}`} />
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <Line name="Betrag" dataKey="amount" stroke="#A10702" />
                      <XAxis
                        dataKey="month"
                        textAnchor="end"
                        angle={-45}
                        height={55}
                      />
                      <YAxis>
                        <Label
                          value={`Betrag [${currency}]`}
                          angle={-90}
                          position="insideBottomLeft"
                          offset={10}
                        />
                      </YAxis>
                    </LineChart>
                  </ResponsiveContainer>
                )}
              />
              <DashboardChartComponent
                title={xsDown ? 'letzte drei Ausgaben' : 'letzte fünf Ausgaben'}
                content={(
                  <ResponsiveTable breakpoint="xs">
                    <ResponsiveTableHead>
                      <ResponsiveTableRow>
                        <ResponsiveTableCell>Datum</ResponsiveTableCell>
                        <ResponsiveTableCell>Beschreibung</ResponsiveTableCell>
                        <ResponsiveTableCell>Betrag</ResponsiveTableCell>
                      </ResponsiveTableRow>
                    </ResponsiveTableHead>
                    <ResponsiveTableBody>
                      {stableSort(
                        outgoings,
                        'outgoingDate',
                        'desc',
                      ).filter((value, index) => index < lastOutgoingsCount).map(outgoing => (
                        <ResponsiveTableRow key={outgoing.id}>
                          <ResponsiveTableCell columnHead="Datum">
                            <Typography>{moment(outgoing.outgoingDate).format('DD.MM.YYYY')}</Typography>
                          </ResponsiveTableCell>
                          <ResponsiveTableCell columnHead="Beschreibung">
                            <Typography>{outgoing.outgoingTitle}</Typography>
                          </ResponsiveTableCell>
                          <ResponsiveTableCell columnHead="Betrag">
                            <Typography>{`${outgoing.outgoingAmount} ${currency}`}</Typography>
                          </ResponsiveTableCell>
                        </ResponsiveTableRow>
                      ))
                      }
                    </ResponsiveTableBody>
                  </ResponsiveTable>
                )}
              />
              <DashboardChartComponent
                title="Budget (monatlich)"
                content={(
                  <ResponsiveContainer>
                    <BarChart
                      data={budget}
                    >
                      <Tooltip formatter={value => `${value} ${currency}`} />
                      <Bar name="Budget" dataKey="monthly">
                        {budget.map(entry => (
                          <Cell key={entry.id} fill={entry.color} />
                        ))}
                      </Bar>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="category"
                        interval={0}
                        textAnchor="start"
                        height={1}
                        angle={-90}
                        tick={{ fill: 'rgba(0, 0, 0, 0.87)' }}
                        tickLine={false}
                        tickMargin={-15}
                        dx={-7}
                      />
                      <YAxis>
                        <Label
                          value={`Betrag [${currency}]`}
                          angle={-90}
                          position="insideBottomLeft"
                          offset={10}
                        />
                      </YAxis>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              />
            </Grid>
            )}
          </Grid>
        ) }
      </Grid>
    );
  }
}

DashboardComponent.propTypes = {
  isLoadingBudget: PropTypes.bool.isRequired,
  isLoadingIncome: PropTypes.bool.isRequired,
  isLoadingOutgoing: PropTypes.bool.isRequired,
  isLoadingUserRights: PropTypes.bool.isRequired,
  budget: PropTypes.arrayOf(CustomPropTypes.budgetEntry).isRequired,
  currency: CustomPropTypes.currency.isRequired,
  monthlyBudgetSum: PropTypes.number,
  netPay: PropTypes.number,
  outgoings: PropTypes.arrayOf(CustomPropTypes.outgoing).isRequired,
  currentMonthsOutgoingSum: PropTypes.number,
  currentMonthsOutgoingsByCategory: PropTypes
    .arrayOf(CustomPropTypes.outgoingByCategory).isRequired,
  lastTwelveMonthsOutgoingSum: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  width: CustomPropTypes.breakpoint.isRequired,
};

DashboardComponent.defaultProps = {
  monthlyBudgetSum: 0,
  netPay: 0,
  currentMonthsOutgoingSum: 0,
};

const mapStateToProps = state => ({
  isLoadingBudget: getBudgetIsLoading(state),
  isLoadingIncome: getIncomeIsLoading(state),
  isLoadingOutgoing: getOutgoingIsLoading(state),
  isLoadingUserRights: getUserRightsIsLoading(state),
  budget: getBudget(state),
  userRole: getUserRole(state),
  currency: getCurrency(state),
  monthlyBudgetSum: getMonthlyBudgetSum(state),
  netPay: getNetPay(state),
  outgoings: getOutgoings(state),
  currentMonthsOutgoingSum: getCurrentMonthsOutgoingSum(state),
  currentMonthsOutgoingsByCategory: getCurrentMonthsOutgoingsByCategory(state),
  lastTwelveMonthsOutgoingSum: getLastTwelveMonthsOutgoingSum(state),
});

const componentWithWidth = withWidth()(DashboardComponent);

export default connect(
  mapStateToProps,
)(componentWithWidth);
