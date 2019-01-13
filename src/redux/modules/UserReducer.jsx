import {
  snapshotWatcherAdmin,
  addUser,
  updateDocument,
} from '../database';
import { auth } from '../../config/firebase';

const collection = 'users';

// ------------------------------------
// Selectors
// ------------------------------------
export const getIsLoading = state => state.users.isLoading;
export const getCurrentUser = state => state.users.currentUser;
export const getUsers = state => state.users.users;


// ------------------------------------
// Action Types
// ------------------------------------
const USER_ADMINISTRATION_IS_LOADING = 'USER_ADMINISTRATION_IS_LOADING';
const RECEIVE_USERS = 'RECEIVE_USERS';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const RESET_CURRENT_USER = 'RESET_CURRENT_USER';


// ------------------------------------
// Action Creators
// ------------------------------------
const isLoading = status => ({
  type: USER_ADMINISTRATION_IS_LOADING,
  status,
});

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users,
});

const setCurrentUser = users => ({
  type: SET_CURRENT_USER,
  users,
});

const resetCurrentUser = () => ({
  type: RESET_CURRENT_USER,
});

// ------------------------------------
// Async Action Creators
// ------------------------------------
const doLoadUsers = snapshot => (dispatch) => {
  dispatch(isLoading(true));
  if (snapshot) {
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(receiveUsers(users));
    dispatch(setCurrentUser(users));
  }
  dispatch(isLoading(false));
};

let unregisterSnapshotWatcherAdmin;
const initializeUsersWatcher = () => (dispatch) => {
  unregisterSnapshotWatcherAdmin = snapshotWatcherAdmin(
    collection,
    snapshot => dispatch(doLoadUsers(snapshot)),
  );
};
export const unregisterUsersWatcher = () => unregisterSnapshotWatcherAdmin();

const doAddUser = user => async (dispatch) => {
  dispatch(isLoading(true));
  await addUser(user);
  dispatch(isLoading(false));
};

const doUpdateUser = user => async (dispatch) => {
  dispatch(isLoading(true));
  await updateDocument(collection, user);
  dispatch(isLoading(false));
};


// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
  initializeUsersWatcher,
  doAddUser,
  doUpdateUser,
  resetCurrentUser,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_ADMINISTRATION_IS_LOADING]: (state, action) => (
    { ...state, isLoading: action.status }
  ),
  [RECEIVE_USERS]: (state, action) => {
    const { users } = action;
    return { ...state, users };
  },
  [SET_CURRENT_USER]: (state, action) => {
    const { users } = action;
    let currentUser = users.find(user => user.userId === auth.currentUser.uid);
    if (typeof currentUser === 'undefined') {
      currentUser = {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName || auth.currentUser.email,
        state: 'unrequested',
        role: 'standard',
      };
    }
    return { ...state, currentUser };
  },
  [RESET_CURRENT_USER]: (state) => {
    const currentUser = {
      id: 'anonymous',
      name: 'anonymous',
      state: 'unrequested',
      role: 'standard',
    };
    return { ...state, currentUser };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: true,
  users: [],
  currentUser: {
    id: 'anonymous',
    name: 'anonymous',
    state: 'unrequested',
    role: 'standard',
  },
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
