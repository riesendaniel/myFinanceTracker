import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardContent,
} from '@material-ui/core';

const DashboardInfoComponent = (props) => {
  const {
    icon,
    title,
    value,
    clickFn,
  } = props;
  return (
    <Card
      onClick={clickFn}
    >
      <CardHeader
        avatar={icon}
        title={title}
      />
      <CardContent>{value}</CardContent>
    </Card>
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
