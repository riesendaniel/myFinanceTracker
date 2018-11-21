import React from 'react';
import {
  Card, CardHeader, CardContent,
  Grid,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    height: 300,
  },
});

const DashboardChartComponent = (props) => {
  const {
    classes,
    title,
    content,
  } = props;
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          className={classes.header}
          title={title}
        />
        <CardContent className={classes.content}>
          {content}
        </CardContent>
      </Card>
    </Grid>
  );
};

DashboardChartComponent.propTypes = {
  classes: CustomPropTypes.classes.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
};

export default withStyles(styles)(DashboardChartComponent);
