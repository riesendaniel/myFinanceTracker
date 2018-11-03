import React, { Component } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

let openSnackbarFn;
class Notifier extends Component {
    state = {
        open: false,
        message: '',
    };

    openSnackbar = ({ message }) => {
        this.setState({
            open: true,
            message,
        });
    };

    handleSnackbarClose = () => {
        this.setState({
            open: false,
            message: '',
        });
    };

    componentDidMount() {
        openSnackbarFn = this.openSnackbar;
    }

    render() {
        const message = (
            <span>{this.state.message}</span>
        );

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message={message}
                autoHideDuration={3000}
                onClose={this.handleSnackbarClose}
                open={this.state.open}
                action={[
                    <IconButton onClick={this.handleSnackbarClose} key="close">
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />
        );
    }
}

export function addMessage({ message }) {
    openSnackbarFn({ message });
}
export default Notifier;
