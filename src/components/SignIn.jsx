import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
  Card, CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import { auth, uiConfig } from '../config/firebase';

const SignIn = () => (
  <Grid container spacing={16} justify="center">
    <Grid item xs={12} md={10}>
      <Typography variant="headline" component="h2">Login</Typography>
    </Grid>
    <Grid item xs={12} md={10}>
      <Card>
        <CardContent>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default SignIn;
