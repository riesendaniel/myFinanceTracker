import { createMuiTheme } from '@material-ui/core';

const primaryColor = '#F9AA33';
const secondaryColor = '#344955';

const theme = {
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
  overrides: {
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
      /* breakpoint einfügen */
      input: {
        textAlign: 'right',
      },
    },
  },
};

export default createMuiTheme(theme);
