import { createMuiTheme } from '@material-ui/core';

const primaryColor = '#F9AA33';
const secondaryColor = '#344955';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
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
  MuiFab: {
    root: {
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      [theme.breakpoints.up('lg')]: {
        position: 'fixed',
        bottom: '32px',
        right: '332px',
      },
    },
  },
  MuiToggleButtonGroup: {
    root: {
      marginTop: '1rem',
      marginBottom: '1rem',
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
    h1: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: '1.35417em',
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
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

export const gridSpacing = 2 * theme.spacing.unit;
