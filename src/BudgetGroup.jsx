import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BudgetGroup = (props) => {
  const { budget, group } = props;
  return (
    <div className="BudgetGroup">
      <h3>{group}</h3>
      <table>
        <thead>
          <tr>
            <th>Kategorie</th>
            <th>monatlich</th>
            <th>jährlich</th>
            <th>Entfernen</th>
          </tr>
        </thead>
        <tbody>
          { budget.map(item => (
            <tr>
              <td>{item.category}</td>
              <td>{item.monthly}</td>
              <td>{item.yearly || '-'}</td>
              <td><button type="button">X</button></td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4"><Link to="/budget/edit">Eintrag hinzufügen...</Link></td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{ budget.reduce((total, item) => total + item.monthly, 0) }</td>
            <td>{ budget.reduce((total, item) => total + item.yearly, 0) }</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

BudgetGroup.propTypes = {
  budget: PropTypes.arrayOf(PropTypes.object).isRequired,
  group: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BudgetGroup;
