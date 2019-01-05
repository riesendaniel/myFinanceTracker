import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { auth, uiConfig } from '../config/firebase';
import { gridSpacing } from '../theme';

const styles = () => ({
  link: {
    textDecoration: 'none',
  },
});

class SignIn extends Component {
  render() {
    return (
        <Grid container spacing={gridSpacing} justify="center">
          <Hidden smDown>
            <Grid item sm={2} md={3} xl={4}/>
          </Hidden>
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <Typography variant="h2" component="h2">Login mit bestehender Adresse</Typography>
          </Grid>
          <Hidden smDown>
            <Grid item sm={2} md={3} xl={4}/>
          </Hidden>
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          </Grid>
          <Hidden smDown>
            <Grid item sm={2} md={3} xl={4}/>
          </Hidden>
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <Link to="/register/" className="test">
              <Typography variant="body1">Hier als neuer User registrieren</Typography>
            </Link>
          </Grid>
        </Grid>
    );
  }
}

export default withStyles(styles)(SignIn);