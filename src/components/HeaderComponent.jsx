import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutButton from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import {
  actions,
} from '../redux/modules/AppReducer';
import history from '../helper/history';

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
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

  render = () => {
    const { classes, fixedMenu, isLoggedIn } = this.props;
    return (
      <div className="Header">
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Link to="/" className={classes.link}>
              <Typography variant="h1">myFinanceTracker</Typography>
            </Link>
            {isLoggedIn && (
              <div>
                <IconButton
                  onClick={() => history.push({ pathname: '/logout' })}
                >
                  <LogoutButton />
                </IconButton>
                {!fixedMenu && (
                  <IconButton onClick={this.handleClick} aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                )}
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  classes: CustomPropTypes.classes.isRequired,
  fixedMenu: PropTypes.bool,
  isLoggedIn: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

HeaderComponent.defaultProps = {
  fixedMenu: false,
};

const HeaderWithStyles = withStyles(styles)(HeaderComponent);

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderWithStyles);
