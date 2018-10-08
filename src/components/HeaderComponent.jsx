import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

class Header extends Component {
  handleClick = () => {
    const {
      toggleMenu,
    } = this.props;
    toggleMenu();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Header">
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="title">myFinanceTracker</Typography>
            <IconButton onClick={this.handleClick} aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
