import { auth, database } from '../config/firebase';
import ErrorLogger from '../helper/ErrorLogger';

const handleError = (error) => {
  ErrorLogger.log(error, 'Fehler beim Laden der Daten aus der Datenbank.');
};

export const snapshotWatcherAdmin = (collection, handleNext) => {
  let unregisterSnapshotWatcher;
  try {
    unregisterSnapshotWatcher = database.collection(collection)
      .onSnapshot(handleNext, handleError);
  } catch (error) {
    ErrorLogger.log(error, `Fehler beim Laden der Sammlung ${collection} von der Datenbank.`);
  }
  return unregisterSnapshotWatcher;
};

export const snapshotWatcher = (collection, handleNext) => {
  let unregisterSnapshotWatcher;
  try {
    unregisterSnapshotWatcher = database.collection(collection).where('userId', '==', auth.currentUser.uid)
      .onSnapshot(handleNext, handleError);
  } catch (error) {
    ErrorLogger.log(error, `Fehler beim Laden der Sammlung ${collection} von der Datenbank.`);
  }
  return unregisterSnapshotWatcher;
};

export const addDocument = async (collection, data) => {
  try {
    const tmpData = data;
    delete tmpData.id;
    await database.collection(collection)
      .add({ ...tmpData, userId: auth.currentUser.uid });
    return true;
  } catch (error) {
    ErrorLogger.log(error, `Fehler beim Speichern des Dokuments in der Sammlung ${collection}.`);
    return false;
  }
};

export const updateDocument = async (collection, data) => {
  try {
    await database.collection(collection).doc(data.id).update(data);
    return true;
  } catch (error) {
    ErrorLogger.log(error, `Fehler beim Anpassen des Dokuments in der Sammlung ${collection}.`);
    return false;
  }
};

export const deleteDocument = async (collection, id) => {
  try {
    await database.collection(collection).doc(id).delete();
    return true;
  } catch (error) {
    ErrorLogger.log(error, `Fehler beim Löschen des Dokuments in der Sammlung ${collection}.`);
    return false;
  }
};
