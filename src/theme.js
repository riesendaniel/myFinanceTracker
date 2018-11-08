import { createMuiTheme } from '@material-ui/core';

const theme = {
  palette: {
    background: '#E5E5E5',
    primary: {
      main: '#F9AA33',
      contrastText: '#000000',
    },
    secondary: {
      main: '#344955',
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
  },
};

export default createMuiTheme(theme);
