import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
  getIsLoading, getBudget, getMonthlyBudgetSum,
} from '../redux/modules/BudgetReducer';
import {
  getOutgoings,
} from '../redux/modules/OutgoingReducer';
import {
  actions as incomeActions,
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
      /* doCalculateOutgoingsPerCategory, */
    } = this.props;
    await doLoadBudget();
    await doLoadIncome();
    /* await doCalculateOutgoingsPerCategory(); */
  }

  handleAddOutgoing = () => {
    // TODO: Diese Funktion muss noch getestet werden.
    const { history } = this.props;
    history.push('/outgoings/edit');
  };

  render = () => {
    const {
      isLoading,
      budget,
      currency,
      monthlyBudgetSum,
      netPay,
      outgoings,
      /* outgoingsPerCategory, */
    } = this.props;
    // TODO: temporäre Variablen entfernen (Framework für Zeit-Handling verwenden)
    const outgoingsActualMonth = 300;
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
      <Paper>
        <Typography variant="headline" component="h2">Übersicht</Typography>
        { isLoading ? <Loading /> : (
          <div>
            <DashboardInfoComponent
              title="Ausgaben"
              value={`${outgoingsActualMonth} ${currency}`}
            />
            <DashboardInfoComponent
              title="Einkommen (Netto)"
              value={`${netPay} ${currency}`}
            />
            <DashboardInfoComponent
              title="Bilanz"
              value={`${netPay - outgoingsActualMonth} ${currency}`}
            />
            <DashboardInfoComponent
              title="budgetierte Bilanz"
              /* TODO: Dies geht von der Annahme aus, dass im Budget nur Ausgaben erfasst werden. */
              value={`${netPay - monthlyBudgetSum} ${currency}`}
            />
            <DashboardInfoComponent
              title="Ausgabe hinzufügen"
              value={<AddCircleIcon />}
              onClick={this.handleAddOutgoing}
            />
            <DashboardChartComponent
              title="monatliche Ausgaben pro Kategorie"
              content={(
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip />
                    <Pie
                      innerRadius="60"
                      outerRadius="80"
                      paddingAngle="4"
                      data={[
                        { category: 'Haushalt', amount: 500 },
                        { category: 'Essen & Getränke', amount: 250 },
                        { category: 'Auto', amount: 750 },
                      ]}
                      dataKey="amount"
                      nameKey="category"
                    >
                      {[
                        { category: 'Haushalt', amount: 500 },
                        { category: 'Essen & Getränke', amount: 250 },
                        { category: 'Auto', amount: 750 },
                      ].map((entry, index) => (
                        <Cell fill={colors[index]} />
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
                    data={[
                      { category: 'Haushalt', amount: 500, budget: 500 },
                      { category: 'Essen & Getränke', amount: 250, budget: 450 },
                      { category: 'Auto', amount: 750, budget: 150 },
                    ]}
                  >
                    <Tooltip />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Bar dataKey="budget" fill="#00C49F" />
                    <Bar dataKey="amount" fill="#FF8042" />
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
                    data={[
                      { month: 'Jan', amount: 1500 },
                      { month: 'Feb', amount: 2300 },
                      { month: 'Mrz', amount: 2400 },
                      { month: 'Apr', amount: 1800 },
                      { month: 'Mai', amount: 2700 },
                      { month: 'Juni', amount: 2000 },
                      { month: 'Juli', amount: 2000 },
                      { month: 'Aug', amount: 3500 },
                      { month: 'Sept', amount: 2800 },
                      { month: 'Okt', amount: 1800 },
                      { month: 'Nov', amount: 2400 },
                      { month: 'Dez', amount: 1900 },
                    ]}
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
                <ul>
                  {outgoings.filter((value, index) => index < 10)
                    .map(outgoing => (
                      <li>
                        <span>{outgoing.date}</span>
                        <span>{outgoing.title}</span>
                        <span>{`${outgoing.amount} ${currency}`}</span>
                      </li>
                    ))
                  }
                </ul>
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
                      {budget.map((entry, index) => (
                        <Cell fill={colors[index]} />
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
  /* outgoingsPerCategory: PropTypes.arrayOf(PropTypes.object).isRequired, */
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  budget: getBudget(state),
  currency: getCurrency(state),
  monthlyBudgetSum: getMonthlyBudgetSum(state),
  netPay: getNetPay(state),
  outgoings: getOutgoings(state),
});

const actions = {
  ...budgetActions,
  ...incomeActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
