import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import CompareIcon from '@material-ui/icons/Compare';
import HomeIcon from '@material-ui/icons/Home';

const Menu = () => (
  <div className="Menu">
    <Drawer
      variant="permanent"
      anchor="right"
    >
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
      </List>
    </Drawer>
  </div>
);

export default Menu;
