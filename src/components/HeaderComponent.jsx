import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar,
  Hidden,
  IconButton,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import {
  actions,
} from '../redux/modules/AppReducer';
import { auth } from '../config/firebase';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

class HeaderComponent extends Component {
  handleClick = () => {
    const {
      toggleMenu,
    } = this.props;
    toggleMenu();
  }

  render() {
    const { classes, isLoggedIn } = this.props;
    return (
      <div className="Header">
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="title">myFinanceTracker</Typography>
            {isLoggedIn && (
              <IconButton
                onClick={() => auth.signOut()}
              >
                <PowerSettingsNew />
              </IconButton>
            )}
            <Hidden lgUp>
              <IconButton onClick={this.handleClick} aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

const HeaderWithStyles = withStyles(styles)(HeaderComponent);

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderWithStyles);
