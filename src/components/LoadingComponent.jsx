import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import CustomPropTypes from '../helper/CustomPropTypes';

const styles = () => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

const LoadingComponent = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
};

LoadingComponent.propTypes = {
  classes: CustomPropTypes.classes.isRequired,
};

export default withStyles(styles)(LoadingComponent);
