import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(LoadingComponent);
