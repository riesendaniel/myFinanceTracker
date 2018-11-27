import React from 'react';
import {
  Card, CardContent, CardHeader,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  ResponsiveTable,
  ResponsiveTableHead, ResponsiveTableBody, ResponsiveTableFooter,
  ResponsiveTableRow, ResponsiveTableCell,
} from './ResponsiveTable';
import BudgetListItem from './BudgetListItemComponent';
import BudgetListSummary from './BudgetListSummaryComponent';

const BudgetListComponent = (props) => {
  const { list, title } = props;
  return (
    <Card>
      { title && (
        <CardHeader
          title={title}
        />
      ) }
      <CardContent>
        { list.length > 0 ? (
          <ResponsiveTable breakpoint="xs">
            <ResponsiveTableHead>
              <ResponsiveTableRow>
                <ResponsiveTableCell>
                  <Typography>Kategorie</Typography>
                </ResponsiveTableCell>
                <ResponsiveTableCell numeric>
                  <Typography>monatlich</Typography>
                </ResponsiveTableCell>
                <ResponsiveTableCell numeric>
                  <Typography>jährlich</Typography>
                </ResponsiveTableCell>
                <ResponsiveTableCell />
              </ResponsiveTableRow>
            </ResponsiveTableHead>
            <ResponsiveTableBody>
              { list.map(item => (
                <BudgetListItem key={item.id} item={item} />
              )) }
            </ResponsiveTableBody>
            <ResponsiveTableFooter>
              <BudgetListSummary list={list} />
            </ResponsiveTableFooter>
          </ResponsiveTable>
        ) : (
          <div>noch keine Einträge vorhanden</div>
        ) }
      </CardContent>
    </Card>
  );
};

BudgetListComponent.propTypes = {
  list: PropTypes.arrayOf(CustomPropTypes.budgetEntry).isRequired,
  title: PropTypes.string,
};

BudgetListComponent.defaultProps = {
  title: '',
};

export default BudgetListComponent;
