import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const database = firebase.firestore();
export const auth = firebase.auth();

database.settings({
  timestampsInSnapshots: true
});