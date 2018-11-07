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
};

export default createMuiTheme(theme);
