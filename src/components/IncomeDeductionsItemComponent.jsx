import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  IconButton,
  TableRow, TableCell,
  Input, InputLabel, InputAdornment,
  Select,
  MenuItem,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

class IncomeDeductionsItemComponent extends Component {
  initialState = {
    id: null,
    description: '',
    type: 'percentaged',
    value: 0,
    editDeduction: '',
  };

  state = { ...this.initialState };

  saveDeduction = async () => {
    const {
      doAddDeduction,
      doUpdateDeduction,
    } = this.props;
    const { id } = this.state;
    if (id) {
      await doUpdateDeduction(this.state);
    } else {
      await doAddDeduction(this.state);
    }
    this.setState({ ...this.initialState });
  }

  deleteDeduction = async (id) => {
    const {
      doDeleteDeduction,
    } = this.props;
    await doDeleteDeduction(id);
  }

  handleEdit = (deduction) => {
    this.setState({
      id: deduction.id,
      description: deduction.description,
      type: deduction.type,
      value: deduction.value,
      editDeduction: deduction.id,
    });
  }

  isEditable = (id) => {
    const { editable } = this.props;
    const { editDeduction } = this.state;
    return editable || id === editDeduction;
  }

  render = () => {
    const {
      deduction,
    } = this.props;
    let item;
    if (this.isEditable(deduction.id)) {
      item = this.state;
    } else {
      item = deduction;
    }
    return (
      <TableRow key={item.id}>
        <TableCell>
          <FormControl>
            {this.isEditable(item.id) && <InputLabel htmlFor="description">Beschreibung</InputLabel>}
            <Input
              id="description"
              type="text"
              value={item.description}
              onChange={event => this.setState({ description: event.target.value })}
              disableUnderline={!this.isEditable(item.id)}
              readOnly={!this.isEditable(item.id)}
            />
          </FormControl>
        </TableCell>
        <TableCell numeric>
          <FormControl>
            { this.isEditable(item.id) && (
              <Select
                value={item.type}
                onChange={event => this.setState({ type: event.target.value })}
              >
                <MenuItem value="percentaged">%</MenuItem>
                <MenuItem value="fixed">CHF</MenuItem>
              </Select>
            )}
            <Input
              type="number"
              value={item.value}
              onChange={event => this.setState({ value: Number(event.target.value) })}
              endAdornment={
                <InputAdornment position="end">{item.type === 'percentaged' ? '%' : 'CHF'}</InputAdornment>
              }
              disableUnderline={!this.isEditable(item.id)}
              readOnly={!this.isEditable(item.id)}
            />
          </FormControl>
        </TableCell>
        { this.isEditable(item.id) ? (
          <TableCell>
            <IconButton onClick={this.saveDeduction}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={() => this.setState({ ...this.initialState })}>
              <CancelIcon />
            </IconButton>
          </TableCell>
        ) : (
          <TableCell>
            <IconButton onClick={() => this.handleEdit(item)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => this.deleteDeduction(item.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    );
  }
}

IncomeDeductionsItemComponent.propTypes = {
  doAddDeduction: PropTypes.func.isRequired,
  doUpdateDeduction: PropTypes.func.isRequired,
  doDeleteDeduction: PropTypes.func.isRequired,
  deduction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  editable: PropTypes.bool,
};

IncomeDeductionsItemComponent.defaultProps = {
  editable: false,
};

export default IncomeDeductionsItemComponent;
