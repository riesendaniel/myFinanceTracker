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
  return <Component {...props}>{childrenWithProps}</Component>;
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

export const ResponsiveTableCell = (props) => {
  const {
    alignRight,
    breakpoint,
    children,
    columnHead,
  } = props;
  const styles = theme => ({
    [theme.breakpoints.down(props.breakpoint)]: {
      root: {
        display: 'flex',
        justifyContent: alignRight ? 'flex-end' : 'space-between',
        alignItems: 'center',
        paddingRight: '24px',
        borderBottom: 'none',
      },
      numeric: {
        flexDirection: 'row',
      },
    },
  });
  const Component = withStyles(styles)(TableCell);
  return (
    <Component {...props}>
      <Hidden
        smUp={breakpoint === 'xs'}
        mdUp={breakpoint === 'sm'}
        lgUp={breakpoint === 'md'}
        xlUp={breakpoint === 'lg'}
      >
        <Typography color="textSecondary">{columnHead}</Typography>
      </Hidden>
      {children}
    </Component>
  );
};

const ResponsiveTableRowFormCellComponent = (props) => {
  const {
    alignRight,
    breakpoint,
    children,
    classes,
    label,
    type,
    width,
  } = props;
  return (
    <div
      className={classNames({
        [classes.cell]: !isWidthDown(breakpoint, width),
        [classes.responsiveCell]: isWidthDown(breakpoint, width),
        [classes.responsiveNumeric]: isWidthDown(breakpoint, width) && type === 'numeric',
        [classes.alignRight]: alignRight,
      })}
    >
      { label && (
        <Hidden
          smUp={breakpoint === 'xs'}
          mdUp={breakpoint === 'sm'}
          lgUp={breakpoint === 'md'}
          xlUp={breakpoint === 'lg'}
        >
          <Typography color="textSecondary">{label}</Typography>
        </Hidden>
      )}
      {children}
    </div>
  );
};

ResponsiveTableRowFormCellComponent.propTypes = {
  alignRight: PropTypes.bool,
  breakpoint: CustomPropTypes.breakpoint.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classes: CustomPropTypes.classes.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(['numeric', 'text']),
  width: CustomPropTypes.breakpoint.isRequired,
};

ResponsiveTableRowFormCellComponent.defaultProps = {
  alignRight: false,
  label: undefined,
  type: 'text',
};

const formCellStyles = () => ({
  cell: {
    display: 'table-cell',
  },
  responsiveCell: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 'none',
  },
  responsiveNumeric: {
    flexDirection: 'row',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
});

const ResponsiveTableRowFormCellWithStyles = withStyles(formCellStyles)(
  ResponsiveTableRowFormCellComponent,
);
export const ResponsiveTableRowFormCell = withWidth()(ResponsiveTableRowFormCellWithStyles);
