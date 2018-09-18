import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog, DialogActions, DialogContent,
  TextField,
} from '@material-ui/core';

class BudgetGroupFormComponent extends Component {
  constructor() {
    super();
    this.state = { open: false };
    this.groupName = '';
  }

  componentDidMount() {
    const {
      doAddBudgetGroup,
      open,
    } = this.props;
    this.doAddBudgetGroup = doAddBudgetGroup;
    this.setState({ open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    this.doAddBudgetGroup(this.groupName);
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose.bind(this)}
      >
        <DialogContent>
          <TextField
            id="category"
            label="Hauptkategorie hinzufügen..."
            placeholder="Hauptkategorie hinzufügen..."
            fullWidth
            onChange={(event) => { this.groupName = event.target.value; }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} type="reset">Abbrechen</Button>
          <Button onClick={this.handleSubmit.bind(this)} type="submit">Hinzufügen</Button>
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
