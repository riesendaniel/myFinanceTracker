import React, { Children, cloneElement } from 'react';
import {
  Grid,
  Hidden,
  Table,
  TableHead, TableBody, TableFooter,
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
  const styles = theme => ({
    [theme.breakpoints.down(props.breakpoint)]: {
      root: {
        display: 'none',
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
      },
    },
  });
  const Component = withStyles(styles)(TableFooter);
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
        alignContent: 'center',
        paddingRight: '24px',
      },
      numeric: {
        flexDirection: 'row',
      },
    },
  });
  const Component = withStyles(styles)(TableCell);
  return (
    <Component {...props}>
      {children}
      <Hidden
        smUp={breakpoint === 'xs'}
        mdUp={breakpoint === 'sm'}
        lgUp={breakpoint === 'md'}
        xlUp={breakpoint === 'lg'}
      >
        <Typography color="textSecondary">{columnHead}</Typography>
      </Hidden>
    </Component>
  );
};
