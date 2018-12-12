import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ValidatorForm,
  SelectValidator,
} from 'react-material-ui-form-validator';
import {
  FormControl,
  MenuItem,
  Typography,
} from '@material-ui/core';
import CustomPropTypes from '../helper/CustomPropTypes';
import FormActions from './FormActionsComponent';
import {
  actions,
} from '../redux/modules/UserReducer';

class UserAdministrationItemComponent extends Component {
  state = {
    name: null,
    state: null,
    role: null,
    editable: false,
  };

  componentDidMount = () => {
    const {
      user,
    } = this.props;
    this.initialUser = { ...user };
    this.setState({ ...user });
  }

  handleInputChange = (event) => {

  }

  handleReset = () => {
    this.setState({ ...this.initialUser });
  }

  handleSubmit = () => {

  }

  render = () => {
    const {
      name,
      state,
      role,
      editable,
    } = this.state;
    const roles = [
      {
        id: 1,
        code: 'standard',
        description: 'Standard',
      },
      {
        id: 2,
        code: 'extended',
        description: 'erweitert',
      },
      {
        id: 3,
        code: 'admin',
        description: 'Administrator',
      },
    ];
    return (
      <ValidatorForm onSubmit={this.handleSubmit}>
        <Typography>{name}</Typography>
        <Typography>{state}</Typography>
        <FormControl>
          <SelectValidator
            name="role"
            label="Rolle"
            value={role}
            onChange={(event) => {
              this.setState({ role: event.target.value });
            }}
            validators={['required']}
            errorMessages={['Dem Benutzer muss eine Rolle zugewiesen werden.']}
          >
            {roles.map(availableRole => (
              <MenuItem key={availableRole.id} value={availableRole.code}>
                {availableRole.description}
              </MenuItem>
            ))}
          </SelectValidator>
        </FormControl>
        <FormActions
          editable={editable}
          deleteFnc={() => {}}
          editFnc={() => this.setState({ editable: true })}
          resetFnc={() => this.handleReset()}
        />
      </ValidatorForm>
    );
  };
}

UserAdministrationItemComponent.propTypes = {
  user: CustomPropTypes.user.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdministrationItemComponent);
