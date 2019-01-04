import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
  Grid,
  Card,
  CardContent,
  Hidden,
  InputLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  ValidatorForm
} from 'react-material-ui-form-validator';
import { auth, uiConfig } from '../config/firebase';
import { gridSpacing } from '../theme';

export default class SignIn extends Component {
  state = { email: '', password: '', errorMessage: null, user: null };

  handleSignUp = () => {
    const { email, password } = this.state;
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => this.setState({ user: user }))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { user } = this.state;
    return (
      !user ? (
        <Grid container spacing={gridSpacing} justify="center">
          <Hidden smDown>
            <Grid item sm={2} md={3} xl={4}/>
          </Hidden>
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <Typography variant="h2" component="h2">Registrierung mit Email</Typography>
          </Grid>
          <Hidden smDown>
            <Grid item sm={2} md={3} xl={4}/>
          </Hidden>
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <Card>
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSignUp}
              >
                <CardContent>
                  <Grid item xs={12} container spacing={gridSpacing} justify="space-between">
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        autoCapitalize="none"
                        onChange={(event) => {
                          this.setState({
                            email: event.target.value
                          });
                        }}
                        value={this.state.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Password"
                        type="password"
                        label="Password"
                        autoCapitalize="none"
                        onChange={(event) => {
                          this.setState({
                            password: event.target.value
                          });
                        }}
                        value={this.state.password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        color="primary"
                        onClick={this.handleSignUp}
                      > Registrieren
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel style={{ color: 'red' }}>{this.state.errorMessage}</InputLabel>
                    </Grid>
                  </Grid>
                </CardContent>
              </ValidatorForm>
            </Card>
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
          </Grid>
        </Grid>
      ) : <Redirect to="/"/>
    );
  }
}