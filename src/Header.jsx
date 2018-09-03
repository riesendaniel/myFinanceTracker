import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Header = () => (
  <div className="Header">
    <AppBar>
      <Toolbar>
        <Typography variant="title">myFinanceTracker</Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
