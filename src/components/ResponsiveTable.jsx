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
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        '&:last-child': {
          borderBottom: 'none',
        },
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
        alignContent: 'center',
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
