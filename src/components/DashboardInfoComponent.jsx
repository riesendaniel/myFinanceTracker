import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardContent,
} from '@material-ui/core';

const DashboardInfoComponent = (props) => {
  const {
    /* image, */
    title,
    value,
  } = props;
  return (
    <Card>
      <CardHeader
        title={title}
      >
        {/* {image} */}
      </CardHeader>
      <CardContent>{value}</CardContent>
    </Card>
  );
};

DashboardInfoComponent.propTypes = {
  /* image: PropTypes.element.isRequired, */
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default DashboardInfoComponent;
