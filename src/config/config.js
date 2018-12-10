// ------------------------------------
// Config for firebase
// ------------------------------------
export const firebaseConfig = {
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
/*   clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY, */
};

export default firebaseConfig;
