import { createMuiTheme } from '@material-ui/core';

const primaryColor = '#F9AA33';
const secondaryColor = '#344955';

const theme = createMuiTheme({
  palette: {
    background: '#E5E5E5',
    primary: {
      main: primaryColor,
      contrastText: '#000000',
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#FFFFFF',
    },
  },
});

theme.overrides = {
  MuiButton: {
    fab: {
      position: 'absolute',
      bottom: '32px',
      right: '32px',
      [theme.breakpoints.up('lg')]: {
        position: 'absolute',
        bottom: '32px',
        right: '332px',
      },
    },
  },
  MuiCard: {
    root: {
      backgroundColor: '#FFFFFF',
    },
  },
  MuiDialog: {
    paper: {
      backgroundColor: '#FFFFFF',
    },
  },
  MuiMenu: {
    paper: {
      backgroundColor: '#FFFFFF',
    },
  },
  MuiTypography: {
    headline: {
      fontWeight: 500,
    },
  },
  MuiListItem: {
    root: {
      '&$selected': {
        backgroundColor: primaryColor,
      },
    },
  },
  MuiTableRow: {
    root: {
      borderBottom: 'none',
      '&:nth-of-type(2n+1)': {
        '&:not($head)': {
          '&:not($footer)': {
            backgroundColor: 'rgba(229, 229, 229, 0.5)',
          },
        },
      },
    },
  },
  MuiInput: {
    inputType: {
      textAlign: 'right',
    },
    input: {
      [theme.breakpoints.down('xs')]: {
        textAlign: 'right',
      },
    },
  },
};

export default theme;
