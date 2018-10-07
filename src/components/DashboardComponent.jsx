import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardContent,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  HorizontalGridLines,
  LineSeries,
  XYPlot,
  XAxis,
  YAxis,
} from 'react-vis';
import Loading from './LoadingComponent';

class DashboardComponent extends Component {
  componentDidMount = async () => {
    const {
      doLoadBudget,
      /* doLoadIncome, */
      doLoadOutgoings,
    } = this.props;
    await doLoadBudget();
    /* await doLoadIncome(); */
    await doLoadOutgoings();
  }

  render = () => {
    const {
      isLoading,
      budget,
      /* income, */
      outgoings,
    } = this.props;

    return (
      <Paper>
        <Typography variant="headline" component="h2">Übersicht</Typography>
        { isLoading ? <Loading /> : (
          <div>
            <Card>
              <CardHeader
                title="Ausgaben"
              />
              <CardContent>
                300.- CHF
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Einkommen"
              />
              <CardContent>
                5430.- CHF
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Bilanz"
              />
              <CardContent>
                5130.- CHF
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="budgetierte Bilanz"
              />
              <CardContent>
                1200.- CHF
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Ausgabe hinzufügen"
              />
              <CardContent>
                +
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="monatliche Ausgaben pro Kategorie"
              />
              <CardContent>
                
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Bilanz des Monats"
              />
              <CardContent>
                
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Ausgaben des vergangenen Jahres (pro Kategorie)"
              />
              <CardContent>
                <XYPlot
                  width="300"
                  height="300"
                  xType="ordinal"
                >
                  <HorizontalGridLines />
                  <LineSeries
                    data={[
                      { x: 'Januar', y: 10 },
                      { x: 'Februar', y: 5 },
                      { x: 'März', y: 15 },
                    ]}
                  />
                  <XAxis />
                  <YAxis
                    title="Anzahl"
                  />
                </XYPlot>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="letzte Ausgaben"
              />
              <CardContent>
                Auto 100.- CHF
                Essen 300.- CHF
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Budget"
              />
              <CardContent>
                
              </CardContent>
            </Card>
          </div>
        ) }
      </Paper>
    );
  }
}

DashboardComponent.propTypes = {
  doLoadBudgetGroups: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  income: PropTypes.objectOf(PropTypes.string).isRequired,
  outgoings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DashboardComponent;
