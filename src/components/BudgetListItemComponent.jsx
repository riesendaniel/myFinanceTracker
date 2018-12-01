import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import withWidth, {
  isWidthUp, isWidthDown,
} from '@material-ui/core/withWidth';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';
import history from '../helper/history';
import {
  getCurrency,
} from '../redux/modules/AppReducer';
import {
  actions,
} from '../redux/modules/BudgetReducer';
import {
  getOutgoingsByCategory,
} from '../redux/modules/OutgoingReducer';

const styles = () => ({
  actions: {
    width: '100px',
  },
});

class BudgetListItemComponent extends Component {
  handleEdit = () => {
    const {
      item,
    } = this.props;
    history.push({
      pathname: '/budget/edit',
      state: { item },
    });
  }

  handleDelete = () => {
    const {
      doUpdateBudgetEntry,
      doDeleteBudgetEntry,
      item,
      outgoingsByCategory,
    } = this.props;
    const categoryOutgoings = outgoingsByCategory.find(category => item.id === category.id);
    if ((typeof categoryOutgoings === 'undefined') || (categoryOutgoings.outgoings.length === 0)) {
      doDeleteBudgetEntry(item.id);
    } else {
      doUpdateBudgetEntry({ ...item, disabled: true });
    }
  }

  render = () => {
    const {
      breakpoint,
      classes,
      currency,
      item,
      width,
    } = this.props;
    const smDown = isWidthDown('sm', width);
    return (
      <ResponsiveTableRow key={item.id} breakpoint={breakpoint}>
        <ResponsiveTableCell component="th" columnHead="Kategorie">
          <Typography>{item.category}</Typography>
        </ResponsiveTableCell>
        <ResponsiveTableCell numeric columnHead="monatlich">
          <Typography color={item.period === 'monthly' ? 'textPrimary' : 'textSecondary'}>
            {`${Math.round(item.monthly)} ${currency}`}
          </Typography>
        </ResponsiveTableCell>
        <ResponsiveTableCell numeric columnHead="jährlich">
          <Typography color={item.period === 'yearly' ? 'textPrimary' : 'textSecondary'}>
            {`${Math.round(item.yearly)} ${currency}`}
          </Typography>
        </ResponsiveTableCell>
        <ResponsiveTableCell
          className={isWidthUp(breakpoint, width, false) ? classes.actions : undefined}
          alignRight
        >
          <IconButton onClick={this.handleEdit}>
            <EditIcon fontSize={smDown ? 'small' : 'default'} />
          </IconButton>
          <IconButton onClick={this.handleDelete}>
            <DeleteOutlineIcon fontSize={smDown ? 'small' : 'default'} />
          </IconButton>
        </ResponsiveTableCell>
      </ResponsiveTableRow>
    );
  }
}

BudgetListItemComponent.propTypes = {
  doUpdateBudgetEntry: PropTypes.func.isRequired,
  doDeleteBudgetEntry: PropTypes.func.isRequired,
  breakpoint: CustomPropTypes.breakpoint.isRequired,
  classes: CustomPropTypes.classes.isRequired,
  currency: CustomPropTypes.currency.isRequired,
  item: CustomPropTypes.budgetEntry.isRequired,
  outgoingsByCategory: PropTypes.arrayOf(CustomPropTypes.outgoing).isRequired,
  width: CustomPropTypes.breakpoint.isRequired,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
  outgoingsByCategory: getOutgoingsByCategory(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithWidth = withWidth()(BudgetListItemComponent);
const componentWithStyles = withStyles(styles)(componentWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
