// ------------------------------------
// Config for firebase
// ------------------------------------
export const firebaseConfig = {
  authDomain: String(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  databaseURL: String(process.env.REACT_APP_FIREBASE_DATABASE_URL),
  apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  projectId: String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
};

export default firebaseConfig;
