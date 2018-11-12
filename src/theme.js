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
  },
};

export default createMuiTheme(theme);
