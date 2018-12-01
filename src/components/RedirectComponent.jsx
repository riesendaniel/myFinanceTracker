import React from 'react';
import { Redirect } from 'react-router-dom';

import { auth } from '../config/firebase';

const RedirectComponent = () => {
  if (!auth.currentUser) {
    return <Redirect to="/signin/" />;
  }
  return null;
};

export default (RedirectComponent);
