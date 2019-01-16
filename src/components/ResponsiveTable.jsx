import React, { Children, cloneElement } from 'react';
import {
  Grid,
  Hidden,
  Table,
  TableHead, TableBody, TableFooter, TablePagination,
  TableRow, TableCell,
  Typography,
  withStyles,
} from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';

const defaultBreakpoint = 'xs';

const removeCustomProps = (allProps, customKeys) => {
  const reducecProps = {};
  Object.keys(allProps).forEach((key) => {
    if (!customKeys.includes(key)) {
      reducecProps[key] = allProps[key];
    }
  });
  return reducecProps;
};

export const ResponsiveTable = (props) => {
  const styles = theme => ({
    [theme.breakpoints.down(props.breakpoint)]: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
    },
  });
  const Component = withStyles(styles)(Table);
  const { children, breakpoint } = props;
  const childrenWithProps = Children.map(children, child => cloneElement(child, { breakpoint }));
  return (
    <Grid item xs={12}>
      <Component {...props}>{childrenWithProps}</Component>
    </Grid>
  );
};

ResponsiveTable.propTypes = {
  breakpoint: CustomPropTypes.breakpoint,
  children: CustomPropTypes.children.isRequired,
};

ResponsiveTable.defaultProps = {
  breakpoint: defaultBreakpoint,
};

export const ResponsiveTableHead = (props) => {
  const { show } = props;
  const styles = theme => ({
    [theme.breakpoints.down(props.breakpoint)]: {
      root: {
        display: show ? 'flex' : 'none',
        flexDirection: show ? 'column' : undefined,
        width: show ? '100%' : undefined,
        borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
      },
    },
  });
  const Component = withStyles(styles)(TableHead);
  const { children, breakpoint } = props;
  const childrenWithProps = Children.map(children, child => cloneElement(child, { breakpoint }));
  const reducedProps = removeCustomProps(props, ['show']);
  return <Component {...reducedProps}>{childrenWithProps}</Component>;
};

ResponsiveTableHead.propTypes = {
  breakpoint: CustomPropTypes.breakpoint,
  children: CustomPropTypes.children.isRequired,
  show: PropTypes.bool,
};

ResponsiveTableHead.defaultProps = {
  breakpoint: defaultBreakpoint,
  show: false,
};

export const ResponsiveTableBody = (props) => {
  const styles = theme => ({
    [theme.breakpoints.down(props.breakpoint)]: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
    },
  });
  const Component = withStyles(styles)(TableBody);
  const { children, breakpoint } = props;
  const childrenWithProps = Children.map(children, child => cloneElement(child, { breakpoint }));
  return <Component {...props}>{childrenWithProps}</Component>;
};

ResponsiveTableBody.propTypes = {
  breakpoint: CustomPropTypes.breakpoint,
  children: CustomPropTypes.children.isRequired,
};

ResponsiveTableBody.defaultProps = {
  breakpoint: defaultBreakpoint,
};

export const ResponsiveTableFooter = (props) => {
  const styles = theme => ({
    [theme.breakpoints.down(props.breakpoint)]: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderTop: '1px solid rgba(0, 0, 0, 0.87)',
        borderBottom: '3px double rgba(0, 0, 0, 0.87)',
      },
    },
  });
  const Component = withStyles(styles)(TableFooter);
  const { children, breakpoint } = props;
  const childrenWithProps = Children.map(children, child => cloneElement(child, { breakpoint }));
  return <Component {...props}>{childrenWithProps}</Component>;
};

ResponsiveTableFooter.propTypes = {
  breakpoint: CustomPropTypes.breakpoint,
  children: CustomPropTypes.children.isRequired,
};

ResponsiveTableFooter.defaultProps = {
  breakpoint: defaultBreakpoint,
};

export const ResponsiveTablePagination = (props) => {
  const styles = theme => ({
    [theme.breakpoints.down(props.breakpoint)]: {
      toolbar: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        height: 'auto',
      },
      caption: {
        width: '60%',
      },
      input: {
        width: '30%',
      },
      actions: {
        width: '30%',
      },
    },
  });
  const Component = withStyles(styles)(TablePagination);
  const { children, breakpoint } = props;
  const childrenWithProps = Children.map(children, child => cloneElement(child, { breakpoint }));
  return <Component {...props}>{childrenWithProps}</Component>;
};

ResponsiveTablePagination.propTypes = {
  breakpoint: CustomPropTypes.breakpoint,
  children: CustomPropTypes.children,
};

ResponsiveTablePagination.defaultProps = {
  breakpoint: defaultBreakpoint,
  children: undefined,
};

export const ResponsiveTableRow = (props) => {
  const styles = theme => ({
    [theme.breakpoints.down(props.breakpoint)]: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      },
    },
  });
  const Component = withStyles(styles)(TableRow);
  const { children, breakpoint } = props;
  const childrenWithProps = Children.map(children, child => cloneElement(child, { breakpoint }));
  return <Component {...props}>{childrenWithProps}</Component>;
};

ResponsiveTableRow.propTypes = {
  breakpoint: CustomPropTypes.breakpoint,
  children: CustomPropTypes.children.isRequired,
};

ResponsiveTableRow.defaultProps = {
  breakpoint: defaultBreakpoint,
};

export const ResponsiveTableCell = (props) => {
  const {
    actions,
    breakpoint,
    children,
    columnHead,
  } = props;
  const styles = theme => ({
    [theme.breakpoints.down(props.breakpoint)]: {
      root: {
        display: 'flex',
        justifyContent: actions ? 'flex-end' : 'space-between',
        alignItems: 'center',
        paddingRight: '24px',
        borderBottom: 'none',
      },
      alignRight: {
        flexDirection: 'row',
      },
    },
  });
  const Component = withStyles(styles)(TableCell);
  const reducedProps = removeCustomProps(props, ['actions', 'breakpoint', 'columnHead']);
  return (
    <Component {...reducedProps}>
      { columnHead && (
        <Hidden
          smUp={breakpoint === 'xs'}
          mdUp={breakpoint === 'sm'}
          lgUp={breakpoint === 'md'}
          xlUp={breakpoint === 'lg'}
        >
          <Typography color="textSecondary">{columnHead}</Typography>
        </Hidden>
      )}
      {children}
    </Component>
  );
};

ResponsiveTableCell.propTypes = {
  actions: PropTypes.bool,
  breakpoint: CustomPropTypes.breakpoint,
  children: CustomPropTypes.children,
  columnHead: PropTypes.string,
};

ResponsiveTableCell.defaultProps = {
  actions: false,
  breakpoint: defaultBreakpoint,
  children: undefined,
  columnHead: undefined,
};

const ResponsiveTableRowFormCellComponent = (props) => {
  const {
    actions,
    breakpoint,
    children,
    classes,
    columnHead,
    width,
  } = props;
  return (
    <div
      className={classNames({
        [classes.cell]: !isWidthDown(breakpoint, width),
        [classes.responsiveCell]: isWidthDown(breakpoint, width),
        [classes.actions]: actions,
      })}
    >
      { columnHead && (
        <Hidden
          smUp={breakpoint === 'xs'}
          mdUp={breakpoint === 'sm'}
          lgUp={breakpoint === 'md'}
          xlUp={breakpoint === 'lg'}
        >
          <Typography color="textSecondary">{columnHead}</Typography>
        </Hidden>
      )}
      {children}
    </div>
  );
};

ResponsiveTableRowFormCellComponent.propTypes = {
  actions: PropTypes.bool,
  breakpoint: CustomPropTypes.breakpoint,
  children: CustomPropTypes.children,
  classes: CustomPropTypes.classes.isRequired,
  columnHead: PropTypes.string,
  width: CustomPropTypes.breakpoint.isRequired,
};

ResponsiveTableRowFormCellComponent.defaultProps = {
  actions: false,
  breakpoint: defaultBreakpoint,
  children: undefined,
  columnHead: undefined,
};

const formCellStyles = () => ({
  cell: {
    display: 'table-cell',
  },
  responsiveCell: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 'none',
  },
  actions: {
    justifyContent: 'flex-end',
  },
});

const ResponsiveTableRowFormCellWithStyles = withStyles(formCellStyles)(
  ResponsiveTableRowFormCellComponent,
);
export const ResponsiveTableRowFormCell = withWidth()(ResponsiveTableRowFormCellWithStyles);
