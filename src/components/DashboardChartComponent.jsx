import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardContent,
  Grid,
  withStyles,
} from '@material-ui/core';

const styles = theme => ({
  card: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
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
    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
      <Card className={classes.card}>
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
