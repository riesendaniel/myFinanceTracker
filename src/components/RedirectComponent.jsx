import React from 'react';
import { Redirect } from 'react-router-dom';

import { auth } from '../config/firebase';

const RedirectComponent = () => {
  if (!auth.currentUser && window.location.pathname !== '/signin/' && window.location.pathname !== '/register/') {
    return <Redirect to="/signin/" />;
  }
  return null;
};

export default (RedirectComponent);
