import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from 'react-router-dom';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  Grid,
  withStyles,
  Typography,
} from '@material-ui/core';
import { auth, uiConfig } from '../config/firebase';
import { gridSpacing } from '../theme';

const styles = () => ({
  link: {
    textDecoration: 'none',
  },
});

const SignIn = (props) => {
  const { classes } = props;

  return (
    <Grid container spacing={gridSpacing} justify="center" alignItems="center" direction="column">
      <Grid item>
        <Typography variant="h2" component="h2">Login</Typography>
      </Grid>
      <Grid item>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      </Grid>
      <Grid item>
        <Link to="/register/" className={classes.link}>
          <Typography variant="body1">Hier als neuer User registrieren</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

SignIn.propTypes = {
  classes: CustomPropTypes.classes.isRequired,
};

export default withStyles(styles)(SignIn);