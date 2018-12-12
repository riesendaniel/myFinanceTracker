import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card, CardContent,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  actions,
  getIsLoading,
  getCurrentUser,
  getUsers,
} from '../redux/modules/UserReducer';
import Loading from './LoadingComponent';
import UserAdministrationItem from './UserAdministrationItemComponent';
import { gridSpacing } from '../theme';

const UserAdministrationComponent = (props) => {
  const {
    isLoading,
    currentUser,
    users,
  } = props;
  if (currentUser.role !== 'admin') {
    return <Redirect to="/notfound" />;
  }
  return (
    <Grid container spacing={gridSpacing} justify="center">
      <Hidden smDown>
        <Grid item md={2} xl={3} />
      </Hidden>
      <Grid item xs={12} md={8} xl={6}>
        <Typography variant="h2" component="h2">Benutzerverwaltung</Typography>
      </Grid>
      <Hidden smDown>
        <Grid item md={2} xl={3} />
      </Hidden>
      { isLoading ? <Loading /> : (
        <Grid item xs={12} md={8} xl={6} container>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                {users.map(user => (
                  <UserAdministrationItem user={user} />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) }
    </Grid>
  );
};

UserAdministrationComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  currentUser: CustomPropTypes.user.isRequired,
  users: PropTypes.arrayOf(CustomPropTypes.user).isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  currentUser: getCurrentUser(state),
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdministrationComponent);
