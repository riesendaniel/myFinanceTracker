import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog, DialogActions, DialogContent,
  TextField,
} from '@material-ui/core';
import {
  actions,
  getIsBudgetGroupFormOpen,
} from '../redux/modules/BudgetReducer';

class BudgetGroupFormComponent extends Component {
  state = {
    groupName: '',
  };

  componentDidMount = () => {
    const {
      budgetGroupFormIsOpen,
      doAddBudgetGroup,
    } = this.props;
    this.budgetGroupFormIsOpen = budgetGroupFormIsOpen;
    this.doAddBudgetGroup = doAddBudgetGroup;
  }

  handleSubmit = () => {
    const { groupName } = this.state;
    this.doAddBudgetGroup(groupName);
    this.budgetGroupFormIsOpen(false);
  }

  render = () => {
    const {
      groupName,
    } = this.state;
    const {
      open,
    } = this.props;
    return (
      <Dialog
        open={open}
        onClose={() => this.budgetGroupFormIsOpen(false)}
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
          <Button onClick={() => this.budgetGroupFormIsOpen(false)} type="reset">Abbrechen</Button>
          <Button onClick={this.handleSubmit} type="submit">Hinzufügen</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

BudgetGroupFormComponent.propTypes = {
  budgetGroupFormIsOpen: PropTypes.func.isRequired,
  doAddBudgetGroup: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  open: getIsBudgetGroupFormOpen(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetGroupFormComponent);
