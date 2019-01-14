import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Hidden,
  InputLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {
  ValidatorForm,
} from 'react-material-ui-form-validator';
import FormActions from './FormActionsComponent';
import { auth } from '../config/firebase';
import { gridSpacing } from '../theme';
import history from '../helper/history';

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    user: null,
  };

  handleSignUp = () => {
    const { email, password } = this.state;
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => this.setState({ user }))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render = () => {
    const {
      user,
      email,
      password,
      errorMessage,
    } = this.state;
    return (
      !user ? (
        <Grid container spacing={gridSpacing} justify="center">
          <Hidden smDown>
            <Grid item sm={2} md={3} xl={4} />
          </Hidden>
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <Typography variant="h2" component="h2">Registrierung mit Email</Typography>
          </Grid>
          <Hidden smDown>
            <Grid item sm={2} md={3} xl={4} />
          </Hidden>
          <Grid item xs={12} sm={8} md={6} xl={4}>
            <Card>
              <ValidatorForm onSubmit={this.handleSignUp}>
                <CardContent>
                  <Grid item xs={12} container spacing={gridSpacing} justify="space-between">
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        autoCapitalize="none"
                        onChange={(event) => {
                          this.setState({
                            email: event.target.value,
                          });
                        }}
                        value={email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        placeholder="Password"
                        type="password"
                        label="Password"
                        autoCapitalize="none"
                        onChange={(event) => {
                          this.setState({
                            password: event.target.value,
                          });
                        }}
                        value={password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel style={{ color: 'red' }}>{errorMessage}</InputLabel>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <FormActions
                    editable
                    resetFnc={() => history.push({ pathname: '/signin/' })}
                  />
                </CardActions>
              </ValidatorForm>
            </Card>
          </Grid>
        </Grid>
      ) : <Redirect to="/" />
    );
  }
}
