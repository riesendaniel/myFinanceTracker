import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/de';
import {
  Grid,
  Paper,
  Table, TableHead, TableBody, TableRow, TableCell,
  Typography,
} from '@material-ui/core';
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
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions as budgetActions,
  getIsLoading as getBudgetIsLoading,
  getBudget, getMonthlyBudgetSum,
} from '../redux/modules/BudgetReducer';
import {
  actions as outgoingActions,
  getIsLoading as getOutgoingIsLoading,
  getOutgoings,
  getCurrentMonthsOutgoingSum, getCurrentMonthsOutgoingsByCategory,
  getLastTwelveMonthsOutgoingSum,
} from '../redux/modules/OutgoingReducer';
import {
  actions as incomeActions,
  getIsLoading as getIncomeIsLoading,
  getNetPay,
} from '../redux/modules/IncomeReducer';
import Loading from './LoadingComponent';
import history from '../helper/history';
import DashboardInfoComponent from './DashboardInfoComponent';
import DashboardChartComponent from './DashboardChartComponent';
import RedirectComponent from './RedirectComponent'
import { auth } from '../config/firebase';

moment.locale('de');

class DashboardComponent extends Component {
  componentDidMount = async () => {
    const {
      doLoadBudget,
      doLoadIncome,
      doLoadOutgoings,
    } = this.props;
    if (auth.currentUser) {
      await doLoadBudget();
      await doLoadIncome();
      await doLoadOutgoings();
    }
  }

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
      budget,
      currency,
      monthlyBudgetSum,
      netPay,
      outgoings,
      currentMonthsOutgoingSum,
      currentMonthsOutgoingsByCategory,
      lastTwelveMonthsOutgoingSum,
    } = this.props;
    const currentMonthsBalance = this.mergeBudgetAndOutgoings(
      budget, currentMonthsOutgoingsByCategory,
    );
    const currentMonth = moment().format('MMMM');
    const name = auth.currentUser ?  auth.currentUser.displayName : '';

    return (
      <Paper>
        <RedirectComponent/>
        <Typography variant="headline" component="h2">Übersicht von {name}</Typography>
        { isLoadingBudget || isLoadingIncome || isLoadingOutgoing ? <Loading /> : (
          <div>
            <Grid container spacing={16}>
              <DashboardInfoComponent
                icon={<MoneyIcon />}
                title={`Ausgaben im ${currentMonth}`}
                value={`${currentMonthsOutgoingSum} ${currency}`}
              />
              <DashboardInfoComponent
                icon={<AttachMoneyIcon />}
                title={`Einkommen (Netto) im ${currentMonth}`}
                value={`${netPay} ${currency}`}
              />
              <DashboardInfoComponent
                icon={<CompareIcon />}
                title={`Ersparnisse im ${currentMonth}`}
                value={`${netPay - currentMonthsOutgoingSum} ${currency}`}
              />
              <DashboardInfoComponent
                icon={<CompareIcon />}
                title="Budgetierte Ersparnisse"
                /* TODO: Dies geht von der Annahme aus,
                   dass im Budget nur Ausgaben erfasst werden. */
                value={`${netPay - monthlyBudgetSum} ${currency}`}
              />
              <DashboardInfoComponent
                icon={<AddIcon />}
                title="Ausgabe hinzufügen"
                value="neue Ausgabe hinzufügen"
                clickFn={this.handleAddOutgoing}
              />
            </Grid>
            <Grid container spacing={16}>
              <DashboardChartComponent
                title={`Ausgaben im ${currentMonth} pro Kategorie`}
                content={(
                  <ResponsiveContainer>
                    <PieChart>
                      <Tooltip formatter={value => `${value} ${currency}`} />
                      <Pie
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        data={currentMonthsOutgoingsByCategory}
                        dataKey="amount"
                        nameKey="category"
                      >
                        {currentMonthsOutgoingsByCategory.map(entry => (
                          <Cell key={entry.id} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="vertical" align="right" verticalAlign="middle" />
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
                      <Bar name="Budget" dataKey="budget" fill="#00C49F" />
                      <Bar name="Ausgaben" dataKey="outgoing" fill="#FF8042" />
                      <XAxis dataKey="category" />
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
                      <Line name="Betrag" dataKey="amount" stroke="#FF8042" />
                      <XAxis dataKey="month" textAnchor="end" angle={-45} height={55} />
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
                title="letzte fünf Ausgaben"
                content={(
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Datum</TableCell>
                        <TableCell>Beschreibung</TableCell>
                        <TableCell>Betrag</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {outgoings.filter((value, index) => index < 5)
                        .map(outgoing => (
                          <TableRow key={outgoing.id}>
                            <TableCell>{moment(outgoing.outgoingDate).format('DD.MM.YYYY')}</TableCell>
                            <TableCell>{outgoing.outgoingTitle}</TableCell>
                            <TableCell>{`${outgoing.outgoingAmount} ${currency}`}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
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
                      <XAxis dataKey="category" />
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
          </div>
        ) }
      </Paper>
    );
  }
}

DashboardComponent.propTypes = {
  isLoadingBudget: PropTypes.bool.isRequired,
  isLoadingIncome: PropTypes.bool.isRequired,
  isLoadingOutgoing: PropTypes.bool.isRequired,
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
  monthlyBudgetSum: PropTypes.number,
  netPay: PropTypes.number,
  outgoings: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentMonthsOutgoingSum: PropTypes.number,
  currentMonthsOutgoingsByCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastTwelveMonthsOutgoingSum: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  budget: getBudget(state),
  currency: getCurrency(state),
  monthlyBudgetSum: getMonthlyBudgetSum(state),
  netPay: getNetPay(state),
  outgoings: getOutgoings(state),
  currentMonthsOutgoingSum: getCurrentMonthsOutgoingSum(state),
  currentMonthsOutgoingsByCategory: getCurrentMonthsOutgoingsByCategory(state),
  lastTwelveMonthsOutgoingSum: getLastTwelveMonthsOutgoingSum(state),
});

const actions = {
  ...budgetActions,
  ...incomeActions,
  ...outgoingActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
