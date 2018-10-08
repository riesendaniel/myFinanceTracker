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
  state = {
    deduction: {},
    editable: false,
  }

  componentDidMount = () => {
    const {
      deduction,
      editable,
    } = this.props;
    this.initialDeduction = { ...deduction };
    this.initialEditable = editable;
    this.setState({ deduction, editable });
  }

  handleInputChange = (event) => {
    const { deduction } = this.state;
    let { value } = event.target;
    if (isNaN(value)) {
      value = String(value);
    } else {
      value = Number(value);
    }
    deduction[event.target.name] = value;
    this.setState({ deduction });
  }

  saveDeduction = async () => {
    const {
      doAddDeduction,
      doUpdateDeduction,
    } = this.props;
    const {
      deduction,
    } = this.state;
    if (deduction.id) {
      await doUpdateDeduction(deduction);
      this.setState({ editable: this.initialEditable });
    } else {
      await doAddDeduction(deduction);
      this.setState({ deduction: this.initialDeduction, editable: this.initialEditable });
    }
  }

  deleteDeduction = async (id) => {
    const {
      doDeleteDeduction,
    } = this.props;
    await doDeleteDeduction(id);
  }

  render = () => {
    const {
      deduction,
      editable,
    } = this.state;
    const {
      currency,
    } = this.props;
    return (
      <TableRow key={deduction.id}>
        <TableCell>
          <FormControl>
            {editable && <InputLabel htmlFor="description">Beschreibung</InputLabel>}
            <Input
              id="description"
              name="description"
              type="text"
              value={deduction.description}
              onChange={event => this.handleInputChange(event)}
              disableUnderline={!editable}
              readOnly={!editable}
            />
          </FormControl>
        </TableCell>
        <TableCell numeric>
          <FormControl>
            { editable && (
              <Select
                name="type"
                value={deduction.type}
                onChange={event => this.handleInputChange(event)}
              >
                <MenuItem value="percentaged">%</MenuItem>
                <MenuItem value="fixed">{currency}</MenuItem>
              </Select>
            )}
            <Input
              name="value"
              type="number"
              value={deduction.value}
              onChange={event => this.handleInputChange(event)}
              endAdornment={
                <InputAdornment position="end">{deduction.type === 'percentaged' ? '%' : currency}</InputAdornment>
              }
              disableUnderline={!editable}
              readOnly={!editable}
            />
          </FormControl>
        </TableCell>
        { editable ? (
          <TableCell>
            <IconButton onClick={this.saveDeduction}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={() => this.setState({
              deduction: { ...this.initialDeduction },
              editable: this.initialEditable,
            })}
            >
              <CancelIcon />
            </IconButton>
          </TableCell>
        ) : (
          <TableCell>
            <IconButton onClick={() => this.setState({ editable: true })}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => this.deleteDeduction(deduction.id)}>
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
  currency: PropTypes.string.isRequired,
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
