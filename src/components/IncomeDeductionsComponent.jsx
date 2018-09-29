import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  IconButton,
  Table, TableBody, TableRow, TableCell, TableFooter,
  TextField,
  Input,
  InputAdornment,
  Select,
  MenuItem,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

class IncomeDeductionsComponent extends Component {
  initialState = {
    description: '',
    type: 'percentaged',
    value: 0,
  };

  state = { ...this.initialState };

  addDeduction = async () => {
    const {
      doAddDeduction,
    } = this.props;
    await doAddDeduction(this.state);
    this.setState({ ...this.initialState });
  }

  deleteDeduction = async (id) => {
    const {
      doDeleteDeduction,
    } = this.props;
    await doDeleteDeduction(id);
  }

  render = () => {
    const {
      deductions,
      totalDeductions,
    } = this.props;
    const {
      description,
      type,
      value,
    } = this.state;
    return (
      <Table>
        <TableBody>
          {deductions.map(deduction => (
            <TableRow key={deduction.id}>
              <TableCell>{deduction.description}</TableCell>
              <TableCell numeric>
                {`${deduction.value} ${deduction.type === 'percentaged' ? '%' : 'CHF'}`}
              </TableCell>
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => this.deleteDeduction(deduction.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <FormControl>
                <TextField
                  label="Beschreibung"
                  value={description}
                  onChange={event => this.setState({ description: event.target.value })}
                />
              </FormControl>
            </TableCell>
            <TableCell numeric>
              <FormControl>
                <Select
                  value={type}
                  onChange={event => this.setState({ type: event.target.value })}
                >
                  <MenuItem value="percentaged">%</MenuItem>
                  <MenuItem value="fixed">CHF</MenuItem>
                </Select>
                <Input
                  type="number"
                  value={value}
                  onChange={event => this.setState({ value: Number(event.target.value) })}
                  endAdornment={
                    <InputAdornment position="end">{type === 'percentaged' ? '%' : 'CHF'}</InputAdornment>
                  }
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <IconButton onClick={this.addDeduction}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={() => this.setState({ ...this.initialState })}>
                <CancelIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Abzüge</TableCell>
            <TableCell numeric>{`${Math.round(totalDeductions)} CHF`}</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

IncomeDeductionsComponent.propTypes = {
  doAddDeduction: PropTypes.func.isRequired,
  doDeleteDeduction: PropTypes.func.isRequired,
  deductions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  totalDeductions: PropTypes.number.isRequired,
};

export default IncomeDeductionsComponent;
