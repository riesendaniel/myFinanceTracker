import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Divider,
  Drawer,
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CompareIcon from '@material-ui/icons/Compare';
import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from '@material-ui/icons/Money';
import PropTypes from 'prop-types';
import CustomPropTypes from '../helper/CustomPropTypes';
import history from '../helper/history';
import {
  actions,
} from '../redux/modules/AppReducer';

class Menu extends Component {
  menu = [
    {
      id: 0,
      link: '/',
      text: 'Home',
      icon: <HomeIcon />,
    },
    {
      id: 1,
      link: '/budget',
      text: 'Budget',
      icon: <CompareIcon />,
    },
    {
      id: 2,
      link: '/income',
      text: 'Einkommen',
      icon: <AttachMoneyIcon />,
    },
    {
      id: 3,
      link: '/outgoings',
      text: 'Ausgaben',
      icon: <MoneyIcon />,
    },
  ];

  handleMenuClick = (menuItem) => {
    history.push(menuItem.link);
    const {
      fixed,
      toggleMenu,
    } = this.props;
    if (!fixed) {
      toggleMenu();
    }
  }

  render = () => {
    const { classes } = this.props;
    const { location } = history;
    return (
      <div className="Menu">
        <Drawer
          variant="permanent"
          anchor="right"
          classes={{
            paper: classes.drawer,
          }}
        >
          <div className={classes.toolbarPlaceholder} />
          <List>
            {this.menu.map(menuItem => (
              <ListItem
                key={menuItem.id}
                button
                selected={location.pathname === menuItem.link}
                onClick={() => this.handleMenuClick(menuItem)}
              >
                <ListItemIcon>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText primary={menuItem.text} />
              </ListItem>
            ))}
          </List>
          <Divider className={classes.divider} />
        </Drawer>
      </div>
    );
  };
}

Menu.propTypes = {
  classes: CustomPropTypes.classes.isRequired,
  fixed: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const MenuConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);

const MenuComponent = (props) => {
  const { fixed, width } = props;

  const styles = theme => ({
    divider: {
      marginLeft: '18px',
      marginRight: '18px',
    },
    drawer: {
      width,
      backgroundColor: theme.palette.background,
    },
    toolbarPlaceholder: theme.mixins.toolbar,
  });

  const MenuWithStyles = withStyles(styles)(MenuConnected);
  return <MenuWithStyles fixed={fixed} />;
};

MenuComponent.propTypes = {
  fixed: PropTypes.bool,
  width: PropTypes.string.isRequired,
};

MenuComponent.defaultProps = {
  fixed: false,
};

export default MenuComponent;
