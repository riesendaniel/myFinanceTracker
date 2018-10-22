import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
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
import DashboardInfoComponent from './DashboardInfoComponent';
import DashboardChartComponent from './DashboardChartComponent';

class DashboardComponent extends Component {
  componentDidMount = async () => {
    const {
      doLoadBudget,
      doLoadIncome,
      doLoadOutgoings,
    } = this.props;
    await doLoadBudget();
    await doLoadIncome();
    await doLoadOutgoings();
  }

  handleAddOutgoing = () => {
    const { history } = this.props;
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
      isLoading,
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
    return (
      <Paper>
        <Typography variant="headline" component="h2">Übersicht</Typography>
        { isLoading ? <Loading /> : (
          <div>
            <DashboardInfoComponent
              icon={<MoneyIcon />}
              title="Ausgaben"
              value={`${currentMonthsOutgoingSum} ${currency}`}
            />
            <DashboardInfoComponent
              icon={<AttachMoneyIcon />}
              title="Einkommen (Netto)"
              value={`${netPay} ${currency}`}
            />
            <DashboardInfoComponent
              icon={<CompareIcon />}
              title="Bilanz"
              value={`${netPay - currentMonthsOutgoingSum} ${currency}`}
            />
            <DashboardInfoComponent
              icon={<CompareIcon />}
              title="budgetierte Bilanz"
              /* TODO: Dies geht von der Annahme aus, dass im Budget nur Ausgaben erfasst werden. */
              value={`${netPay - monthlyBudgetSum} ${currency}`}
            />
            <DashboardInfoComponent
              icon={<AddIcon />}
              title="Ausgabe hinzufügen"
              value="neue Ausgabe hinzufügen"
              clickFn={this.handleAddOutgoing}
            />
            <DashboardChartComponent
              title="monatliche Ausgaben pro Kategorie"
              content={(
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip />
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
              title="Bilanz des Monats"
              content={(
                <ResponsiveContainer>
                  <BarChart
                    data={currentMonthsBalance}
                  >
                    <Tooltip />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Bar dataKey="budget" fill="#00C49F" />
                    <Bar dataKey="outgoing" fill="#FF8042" />
                    <XAxis dataKey="category" />
                    <YAxis />
                  </BarChart>
                </ResponsiveContainer>
              )}
            />
            <DashboardChartComponent
              title="Ausgaben des vergangenen Jahres (pro Kategorie)"
              content={(
                <ResponsiveContainer>
                  <LineChart
                    data={lastTwelveMonthsOutgoingSum}
                  >
                    <Tooltip />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Line dataKey="amount" stroke="#FF8042" />
                    <XAxis dataKey="month" />
                    <YAxis />
                  </LineChart>
                </ResponsiveContainer>
              )}
            />
            <DashboardChartComponent
              title="letzte Ausgaben"
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
                    <Tooltip />
                    <Bar dataKey="monthly">
                      {budget.map(entry => (
                        <Cell fill={entry.color} />
                      ))}
                    </Bar>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                  </BarChart>
                </ResponsiveContainer>
              )}
            />
          </div>
        ) }
      </Paper>
    );
  }
}

DashboardComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
  monthlyBudgetSum: PropTypes.number.isRequired,
  netPay: PropTypes.number.isRequired,
  outgoings: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentMonthsOutgoingSum: PropTypes.number.isRequired,
  currentMonthsOutgoingsByCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastTwelveMonthsOutgoingSum: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  isLoading: getBudgetIsLoading(state) || getIncomeIsLoading(state) || getOutgoingIsLoading(state),
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
