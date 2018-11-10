import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { auth } from '../config/firebase';

class RedirectComponent extends Component {
  render() {
    if (!auth.currentUser) {
      return <Redirect to="/signin/"/>;
    }
    return null;
  }
}
export default (RedirectComponent);
