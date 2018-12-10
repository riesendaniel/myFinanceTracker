import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as admin from 'firebase-admin';

import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export const auth = firebase.auth();

export const database = firebase.firestore();

database.settings({
  timestampsInSnapshots: true,
});

export const firebaseAdmin = admin.initializeApp();
/* export const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  databaseURL: firebaseConfig.databaseURL,
}); */
