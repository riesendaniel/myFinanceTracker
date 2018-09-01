import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Header extends Component {
    
    render() {

        return (
            <div className="Header">
                <AppBar>
                    <Toolbar>
                        <Typography variant="title">myFinanceTracker</Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

export default Header;
