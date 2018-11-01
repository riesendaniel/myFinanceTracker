import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardContent,
  Grid,
} from '@material-ui/core';

const DashboardInfoComponent = (props) => {
  const {
    icon,
    title,
    value,
    clickFn,
  } = props;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card
        onClick={clickFn}
      >
        <CardHeader
          avatar={icon}
          title={title}
        />
        <CardContent>{value}</CardContent>
      </Card>
    </Grid>
  );
};

DashboardInfoComponent.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  clickFn: PropTypes.func,
};

DashboardInfoComponent.defaultProps = {
  clickFn: undefined,
};

export default DashboardInfoComponent;
