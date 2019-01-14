import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withStyles,
} from '@material-ui/core';
import withWidth, {
  isWidthUp,
} from '@material-ui/core/withWidth';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';
import FormActions from './FormActionsComponent';
import history from '../helper/history';
import { actions } from '../redux/modules/OutgoingReducer';
import { getCurrency } from '../redux/modules/AppReducer';

const styles = () => ({
  actions: {
    width: '100px',
  },
});

class OutgoingItemComponent extends Component {
  static propTypes = {
    doDeleteOutgoing: PropTypes.func.isRequired,
    breakpoint: CustomPropTypes.breakpoint.isRequired,
    classes: CustomPropTypes.classes.isRequired,
    currency: CustomPropTypes.currency.isRequired,
    outgoing: CustomPropTypes.outgoing.isRequired,
    width: CustomPropTypes.breakpoint.isRequired,
  };

  handleEdit = () => {
    const {
      outgoing,
    } = this.props;
    history.push({
      pathname: '/outgoing/edit',
      state: { outgoing },
    });
  }

  handleDelete = async () => {
    const { doDeleteOutgoing, outgoing } = this.props;
    await doDeleteOutgoing(outgoing.id);
  }

  render = () => {
    const {
      breakpoint,
      classes,
      currency,
      outgoing,
      width,
    } = this.props;

    return (
      <ResponsiveTableRow key={outgoing.id} breakpoint={breakpoint}>
        <ResponsiveTableCell columnHead="Titel">{outgoing.outgoingTitle}</ResponsiveTableCell>
        <ResponsiveTableCell columnHead="Datum">{moment(outgoing.outgoingDate).format('DD.MM.YYYY')}</ResponsiveTableCell>
        <ResponsiveTableCell columnHead="Kategorie">{outgoing.outgoingCategory}</ResponsiveTableCell>
        <ResponsiveTableCell align="right" columnHead="Betrag">{`${outgoing.outgoingAmount} ${currency}`}</ResponsiveTableCell>
        <ResponsiveTableCell
          className={isWidthUp(breakpoint, width, false) ? classes.actions : undefined}
          actions
        >
          <FormActions
            deleteFnc={this.handleDelete}
            editFnc={this.handleEdit}
          />
        </ResponsiveTableCell>
      </ResponsiveTableRow>
    );
  }
}

const mapStateToProps = state => ({
  currency: getCurrency(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const componentWithWidth = withWidth()(OutgoingItemComponent);
const componentWithStyles = withStyles(styles)(componentWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componentWithStyles);
