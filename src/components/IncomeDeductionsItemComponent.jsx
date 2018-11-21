import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FormControl,
  IconButton,
  Input, InputLabel, InputAdornment,
  Select,
  MenuItem,
  withStyles,
} from '@material-ui/core';
import withWidth, {
  isWidthUp,
} from '@material-ui/core/withWidth';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
} from '../redux/modules/IncomeReducer';

const styles = () => ({
  value: {
    maxWidth: '150px',
  },
  editAmount: {
    display: 'inline-block',
    width: '145px',
  },
  typeInput: {
    maxWidth: '70px',
  },
  valueInput: {
    maxWidth: '75px',
  },
  actions: {
    width: '100px',
  },
});

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
    if (deduction.id !== 'new') {
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
      breakpoint,
      classes,
      currency,
      width,
    } = this.props;
    const breakpointUp = isWidthUp(breakpoint, width, false);
    return (
      <ResponsiveTableRow key={deduction.id} breakpoint={breakpoint}>
        <ResponsiveTableCell
          columnHead="Beschreibung"
        >
          <FormControl>
            {(breakpointUp && editable) && <InputLabel htmlFor="description">Beschreibung</InputLabel>}
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
        </ResponsiveTableCell>
        <ResponsiveTableCell
          className={breakpointUp ? classes.value : undefined}
          numeric
          columnHead="Betrag"
        >
          <FormControl className={classes.editAmount}>
            <Input
              className={classes.valueInput}
              name="value"
              type="number"
              value={deduction.value}
              onChange={event => this.handleInputChange(event)}
              endAdornment={editable ? undefined : (
                <InputAdornment position="end">{deduction.type === 'percentaged' ? '%' : currency}</InputAdornment>
              )}
              disableUnderline={!editable}
              readOnly={!editable}
            />
            { editable && (
              <Select
                className={classes.typeInput}
                name="type"
                value={deduction.type}
                onChange={event => this.handleInputChange(event)}
              >
                <MenuItem value="percentaged">%</MenuItem>
                <MenuItem value="fixed">{currency}</MenuItem>
              </Select>
            )}
          </FormControl>
        </ResponsiveTableCell>
        { editable ? (
          <ResponsiveTableCell
            className={breakpointUp ? classes.actions : undefined}
            alignRight
          >
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
          </ResponsiveTableCell>
        ) : (
          <ResponsiveTableCell
            className={breakpointUp ? classes.actions : undefined}
            alignRight
          >
            <IconButton onClick={() => this.setState({ editable: true })}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => this.deleteDeduction(deduction.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </ResponsiveTableCell>
        )}
      </ResponsiveTableRow>
    );
  }
}

IncomeDeductionsItemComponent.propTypes = {
  doAddDeduction: PropTypes.func.isRequired,
  doUpdateDeduction: PropTypes.func.isRequired,
  doDeleteDeduction: PropTypes.func.isRequired,
  breakpoint: CustomPropTypes.breakpoint.isRequired,
  classes: CustomPropTypes.classes.isRequired,
  currency: CustomPropTypes.currency.isRequired,
  deduction: CustomPropTypes.deduction.isRequired,
  editable: PropTypes.bool,
  width: CustomPropTypes.breakpoint.isRequired,
};

IncomeDeductionsItemComponent.defaultProps = {
  editable: false,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithWidth = withWidth()(IncomeDeductionsItemComponent);
const componentWithStyles = withStyles(styles)(componentWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
