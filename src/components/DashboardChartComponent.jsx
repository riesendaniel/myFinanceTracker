import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardContent,
  Grid,
} from '@material-ui/core';

const DashboardChartComponent = (props) => {
  const {
    title,
    content,
  } = props;
  const styles = {
    cardContent: {
      height: 200,
    },
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
      <Card>
        <CardHeader
          title={title}
        />
        <CardContent style={styles.cardContent}>
          {content}
        </CardContent>
      </Card>
    </Grid>
  );
};

DashboardChartComponent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
};

export default DashboardChartComponent;
