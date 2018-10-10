import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CompareIcon from '@material-ui/icons/Compare';
import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from '@material-ui/icons/Money';

const MenuComponent = (props) => {
  const { width } = props;

  const styles = theme => ({
    drawer: {
      width,
    },
    toolbarPlaceholder: theme.mixins.toolbar,
  });

  const Menu = (props) => {
    const { classes } = props;
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
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/budget">
              <ListItemIcon>
                <CompareIcon />
              </ListItemIcon>
              <ListItemText primary="Budget" />
            </ListItem>
            <ListItem button component={Link} to="/income">
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Einkommen" />
            </ListItem>
            <ListItem button component={Link} to="/outgoings">
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Ausgaben" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  };

  Menu.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  const MenuWithStyles = withStyles(styles)(Menu);
  return <MenuWithStyles />;
};

MenuComponent.propTypes = {
  width: PropTypes.string.isRequired,
};

export default MenuComponent;
