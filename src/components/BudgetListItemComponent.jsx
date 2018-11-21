import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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
    const { doDeleteBudgetEntry, item } = this.props;
    doDeleteBudgetEntry(item.id);
  }

  render = () => {
    const {
      breakpoint,
      classes,
      currency,
      item,
      width,
    } = this.props;
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
            <EditIcon fontSize={isWidthDown('sm', width) ? 'small' : 'default'} />
          </IconButton>
          <IconButton onClick={this.handleDelete}>
            <DeleteOutlineIcon fontSize={isWidthDown('sm', width) ? 'small' : 'default'} />
          </IconButton>
        </ResponsiveTableCell>
      </ResponsiveTableRow>
    );
  }
}

BudgetListItemComponent.propTypes = {
  doDeleteBudgetEntry: PropTypes.func.isRequired,
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
  classes: PropTypes.shape(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    monthly: PropTypes.number.isRequired,
    yearly: PropTypes.number.isRequired,
  }).isRequired,
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
};

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithWidth = withWidth()(BudgetListItemComponent);
const componentWithStyles = withStyles(styles)(componentWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
