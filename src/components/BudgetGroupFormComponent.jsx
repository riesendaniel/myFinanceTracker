import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog, DialogActions, DialogContent,
  TextField,
} from '@material-ui/core';

class BudgetGroupFormComponent extends Component {
  state = {
    open: false,
    groupName: '',
  };

  componentDidMount() {
    const {
      doAddBudgetGroup,
      open,
    } = this.props;
    this.doAddBudgetGroup = doAddBudgetGroup;
    this.setState({ open });
  }

  handleSubmit = () => {
    const { groupName } = this.state;
    this.doAddBudgetGroup(groupName);
    this.setState({ open: false });
  }

  render() {
    const {
      open,
      groupName,
    } = this.state;
    return (
      <Dialog
        open={open}
        onClose={() => this.setState({ open: false })}
      >
        <DialogContent>
          <TextField
            id="category"
            label="Hauptkategorie hinzufügen..."
            placeholder="Hauptkategorie hinzufügen..."
            fullWidth
            value={groupName}
            onChange={(event) => { this.setState({ groupName: event.target.value }); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({ open: false })} type="reset">Abbrechen</Button>
          <Button onClick={this.handleSubmit} type="submit">Hinzufügen</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

BudgetGroupFormComponent.propTypes = {
  doAddBudgetGroup: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default BudgetGroupFormComponent;
