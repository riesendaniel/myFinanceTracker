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
    MuiTypography: {
      headline: {
        marginBottom: '16px',
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
  },
};

export default createMuiTheme(theme);
