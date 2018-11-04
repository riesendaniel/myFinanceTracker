import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardContent,
  Grid,
  withStyles,
} from '@material-ui/core';

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary.light,
  },
  content: {
    height: 200,
  },
});

const DashboardChartComponent = (props) => {
  const {
    classes,
    title,
    content,
  } = props;
  return (
    <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
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
  classes: PropTypes.shape(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
};

export default withStyles(styles)(DashboardChartComponent);
