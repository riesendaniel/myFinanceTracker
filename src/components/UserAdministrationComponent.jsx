import React from 'react';
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
import ErrorLogger from '../helper/ErrorLogger';
import { firebaseAdmin } from '../config/firebase';
import {
  actions,
  getIsLoading,
  getUsers,
} from '../redux/modules/UserReducer';
import Loading from './LoadingComponent';
import { gridSpacing } from '../theme';

const authUserList = [];

const listUsersFromFirebase = async (nextPageToken) => {
  try {
    const result = await firebaseAdmin.listUsers(1000, nextPageToken);
    result.users.forEach(user => authUserList.push(user.toJSON()));
    if (result.pageToken) {
      // there are more users to fetch
      listUsersFromFirebase(result.pageToken);
    }
  } catch (error) {
    ErrorLogger.log(error, 'Fehler beim Laden der Benutzerliste.');
  }
};

const UserAdministrationComponent = async (props) => {
  await listUsersFromFirebase();
  console.log(authUserList);
  const {
    isLoading,
    users,
  } = props;
  return (
    <Grid container spacing={gridSpacing} justify="center">
      <Hidden smDown>
        <Grid item md={2} xl={3} />
      </Hidden>
      <Grid item xs={12} md={8} xl={6}>
        <Typography variant="h2" component="h2">Einkommen</Typography>
      </Grid>
      <Hidden smDown>
        <Grid item md={2} xl={3} />
      </Hidden>
      { isLoading ? <Loading /> : (
        <Grid item xs={12} md={8} xl={6} container>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                {users.map}
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
  users: PropTypes.arrayOf(CustomPropTypes.user).isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdministrationComponent);
