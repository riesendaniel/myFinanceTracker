import { auth } from '../config/firebase';

const Logout = () => {
  auth.signOut();
  return null;
};

export default Logout;
