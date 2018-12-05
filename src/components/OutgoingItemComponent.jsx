import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class OutgoingItemComponent extends Component {
  static propTypes = {
    doDeleteOutgoing: PropTypes.func.isRequired,
    breakpoint: CustomPropTypes.breakpoint.isRequired,
    currency: CustomPropTypes.currency.isRequired,
    outgoing: CustomPropTypes.outgoing.isRequired,
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

  render() {
    const { breakpoint, currency, outgoing } = this.props;

    return (
      <ResponsiveTableRow key={outgoing.id} breakpoint={breakpoint}>
        <ResponsiveTableCell columnHead="Titel">{outgoing.outgoingTitle}</ResponsiveTableCell>
        <ResponsiveTableCell columnHead="Datum">{moment(outgoing.outgoingDate).format('DD.MM.YYYY')}</ResponsiveTableCell>
        <ResponsiveTableCell columnHead="Kategorie">{outgoing.outgoingCategory}</ResponsiveTableCell>
        <ResponsiveTableCell columnHead="Betrag">{`${outgoing.outgoingAmount} ${currency}`}</ResponsiveTableCell>
        <ResponsiveTableCell alignRight>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OutgoingItemComponent);
