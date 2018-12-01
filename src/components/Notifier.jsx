import React, { Component } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

let openSnackbarFn;
class Notifier extends Component {
  state = {
    open: false,
    message: '',
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

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

  render() {
    const {
      message,
      open,
    } = this.state;
    const messageElem = (
      <span>{message}</span>
    );

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={messageElem}
        autoHideDuration={3000}
        onClose={this.handleSnackbarClose}
        open={open}
        action={[
          <IconButton onClick={this.handleSnackbarClose} key="close">
            <CloseIcon />
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
