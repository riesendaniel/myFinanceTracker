import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie,
  ResponsiveContainer,
  XAxis,
} from 'recharts';
import {
  actions as budgetActions,
  getIsLoading, getBudget,
} from '../redux/modules/BudgetReducer';
import Loading from './LoadingComponent';
import DashboardInfoComponent from './DashboardInfoComponent';
import DashboardChartComponent from './DashboardChartComponent';

class DashboardComponent extends Component {
  componentDidMount = async () => {
    const {
      doLoadBudget,
      /* doLoadIncome, */
      /* doCalculateOutgoingsPerCategory, */
    } = this.props;
    await doLoadBudget();
    /* await doLoadIncome(); */
    /* await doCalculateOutgoingsPerCategory(); */
  }

  render = () => {
    const {
      isLoading,
      budget,
      /* income, */
      /* outgoingsPerCategory, */
    } = this.props;
    return (
      <Paper>
        <Typography variant="headline" component="h2">Übersicht</Typography>
        { isLoading ? <Loading /> : (
          <div>
            <DashboardInfoComponent
              title="Ausgaben"
              value="300.- CHF"
            />
            <DashboardInfoComponent
              title="Einkommen"
              value="5430.- CHF"
            />
            <DashboardInfoComponent
              title="Bilanz"
              value="5130.- CHF"
            />
            <DashboardInfoComponent
              title="budgetierte Bilanz"
              value="1200.- CHF"
            />
            <DashboardInfoComponent
              title="Ausgabe hinzufügen"
              value="+"
            />
            <DashboardChartComponent
              title="monatliche Ausgaben pro Kategorie"
              content={(
                <PieChart width={200} height={200}>
                  <Pie
                    innerRadius="20"
                    outerRadius="50"
                    data={[
                      { category: 'Haushalt', amount: 500 },
                      { category: 'Essen & Getränke', amount: 250 },
                      { category: 'Auto', amount: 750 },
                    ]}
                    dataKey="amount"
                    nameKey="category"
                  />
                </PieChart>
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
                    <Bar dataKey="amount" />
                    <Bar dataKey="budget" />
                    <XAxis dataKey="category" />
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
                    <Line dataKey="amount" />
                    <XAxis dataKey="month" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            />
            <DashboardChartComponent
              title="letzte Ausgaben"
              content={(
                <div>
                  <div>Auto 100.- CHF</div>
                  <div>Essen 300.- CHF</div>
                </div>
              )}
            />
            <DashboardChartComponent
              title="Budget (monatlich)"
              content={(
                <ResponsiveContainer>
                  <BarChart
                    data={budget}
                  >
                    <Bar dataKey="monthly" />
                    <XAxis dataKey="category" />
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
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* income: PropTypes.objectOf(PropTypes.string).isRequired, */
  /* outgoingsPerCategory: PropTypes.arrayOf(PropTypes.object).isRequired, */
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  budget: getBudget(state),
});

const actions = {
  ...budgetActions,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
