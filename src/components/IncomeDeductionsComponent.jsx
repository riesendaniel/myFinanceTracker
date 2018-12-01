import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTable,
  ResponsiveTableBody,
} from './ResponsiveTable';
import {
  actions,
  getDeductions,
} from '../redux/modules/IncomeReducer';
import IncomDeductionsItem from './IncomeDeductionsItemComponent';

const IncomeDeductionsComponent = (props) => {
  const emptyDeduction = {
    id: 'new',
    description: '',
    type: 'percentaged',
    value: 0,
  };
  const {
    deductions,
  } = props;
  return (
    <ResponsiveTable breakpoint="sm">
      <ResponsiveTableBody>
        {deductions.map(deduction => (
          <IncomDeductionsItem key={deduction.id} deduction={deduction} />
        ))}
        <IncomDeductionsItem deduction={emptyDeduction} editable />
      </ResponsiveTableBody>
    </ResponsiveTable>
  );
};

IncomeDeductionsComponent.propTypes = {
  deductions: PropTypes.arrayOf(CustomPropTypes.deduction).isRequired,
};

const mapStateToProps = state => ({
  deductions: getDeductions(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncomeDeductionsComponent);
