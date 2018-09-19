import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardHeader,
  Table, TableBody, TableCell, TableHead, TableFooter, TableRow,
} from '@material-ui/core';
import BudgetListItem from '../container/BudgetListItemContainer';
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kategorie</TableCell>
                <TableCell numeric>monatlich</TableCell>
                <TableCell numeric>jährlich</TableCell>
                <TableCell>Entfernen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { list.map(item => (
                <BudgetListItem key={item.id} item={item} />
              )) }
            </TableBody>
            <TableFooter>
              <BudgetListSummary list={list} />
            </TableFooter>
          </Table>
        ) : (
          <div>noch keine Einträge vorhanden</div>
        ) }
      </CardContent>
    </Card>
  );
};

BudgetListComponent.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
};

BudgetListComponent.defaultProps = {
  title: '',
};

export default BudgetListComponent;
