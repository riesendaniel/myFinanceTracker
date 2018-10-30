import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const database = firebase.database();
export const auth = firebase.auth();
