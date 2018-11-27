import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { auth, uiConfig } from '../config/firebase';
import { gridSpacing } from '../theme';

const SignIn = () => (
  <Grid container spacing={gridSpacing} justify="center">
    <Grid item xs={12} md={10}>
      <Typography variant="headline" component="h2">Login</Typography>
    </Grid>
    <Grid item xs={12} md={10}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </Grid>
  </Grid>
);

export default SignIn;
