import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTableRow, ResponsiveTableCell,
  ResponsiveTableRowFormCell,
} from './ResponsiveTable';
import {
  actions,
} from '../redux/modules/UserReducer';

class UserAdministrationItemComponent extends Component {
  componentDidMount = () => {
    const {
      user,
    } = this.props;
    this.initialUser = { ...user };
  }

  handleChange = async (role, state) => {
    const newRole = role;
    let newState = state;
    const {
      doUpdateUser,
      user,
    } = this.props;
    if (newState === null && newRole === 'standard') {
      newState = 'rejected';
    }
    newState = newState || 'approved';
    if (newRole !== this.initialUser.role || (newRole === 'standard' && newState !== this.initialUser.state)) {
      await doUpdateUser({
        ...user,
        role: newRole,
        state: newState,
      });
    }
  }

  render = () => {
    const {
      breakpoint,
      user,
    } = this.props;
    const {
      id,
      name,
      state,
      role,
    } = user;
    const roles = [
      {
        id: 1,
        code: 'standard',
        description: 'Standard',
      },
      {
        id: 2,
        code: 'extended',
        description: 'Erweiterte Berechtigung',
      },
      {
        id: 3,
        code: 'admin',
        description: 'Administrator',
      },
    ];
    return (
      <ResponsiveTableRow key={id} breakpoint={breakpoint}>
        <ResponsiveTableCell>
          <Grid container>
            <Grid item xs={12} container justify="space-between" alignItems="center">
              <ResponsiveTableRowFormCell
                breakpoint={breakpoint}
                columnHead="Benutzer"
              >
                <Typography>{name}</Typography>
              </ResponsiveTableRowFormCell>
              <ResponsiveTableRowFormCell
                breakpoint={breakpoint}
                columnHead="Rolle"
              >
                <FormControl>
                  <Select
                    name="role"
                    value={role}
                    onChange={event => this.handleChange(event.target.value, null)}
                  >
                    {roles.map(availableRole => (
                      <MenuItem key={availableRole.id} value={availableRole.code}>
                        {availableRole.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ResponsiveTableRowFormCell>
            </Grid>
            <Grid item xs={12} container justify="flex-end">
              <ResponsiveTableRowFormCell
                breakpoint={breakpoint}
                alignRight
              >
                {(role === 'standard' && state === 'pending') && (
                  <div>
                    <Typography>Erweiterte Berechtigung gewünscht:</Typography>
                    <Button onClick={() => this.handleChange('extended', 'approved')}>erlauben</Button>
                    <Button onClick={() => this.handleChange('standard', 'rejected')}>ablehnen</Button>
                  </div>
                )}
                {(role === 'standard' && state === 'rejected') && <Typography>Erweiterte Berechtigung abgelehnt.</Typography>}
              </ResponsiveTableRowFormCell>
            </Grid>
          </Grid>
        </ResponsiveTableCell>
      </ResponsiveTableRow>
    );
  };
}

UserAdministrationItemComponent.propTypes = {
  doUpdateUser: PropTypes.func.isRequired,
  breakpoint: CustomPropTypes.breakpoint.isRequired,
  user: CustomPropTypes.user.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdministrationItemComponent);
