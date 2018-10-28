import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardContent,
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
    <Card>
      <CardHeader
        title={title}
      />
      <CardContent style={styles.cardContent}>
        {content}
      </CardContent>
    </Card>
  );
};

DashboardChartComponent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
};

export default DashboardChartComponent;
