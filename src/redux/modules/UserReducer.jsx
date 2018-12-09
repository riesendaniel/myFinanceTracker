import {
  snapshotWatcherAdmin,
  addDocument,
  updateDocument,
} from '../database';
import { auth } from '../../config/firebase';

const collection = 'users';

// ------------------------------------
// Selectors
// ------------------------------------
export const getIsLoading = state => state.users.isLoading;
export const getUserRole = state => state.users.userRole;
export const getUsers = state => state.users.users;


// ------------------------------------
// Action Types
// ------------------------------------
const USER_ADMINISTRATION_IS_LOADING = 'USER_ADMINISTRATION_IS_LOADING';
const RECEIVE_USERS = 'RECEIVE_USERS';
const SET_USER_ROLE = 'SET_USER_ROLE';


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

const setUserRole = users => ({
  type: SET_USER_ROLE,
  users,
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
    dispatch(setUserRole(users));
  }
  dispatch(isLoading(false));
};

const initializeUsersWatcher = () => (dispatch) => {
  snapshotWatcherAdmin(collection, snapshot => dispatch(doLoadUsers(snapshot)));
};

const doAddUser = user => async (dispatch) => {
  dispatch(isLoading(true));
  await addDocument(collection, user);
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
  [SET_USER_ROLE]: (state, action) => {
    const { users } = action;
    const currentUser = users.find(user => user.userId === auth.currentUser.uid);
    let userRole;
    if (typeof currentUser !== 'undefined') {
      userRole = currentUser.userRole;
    } else {
      userRole = '';
    }
    return { ...state, userRole };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: true,
  users: [],
  userRole: '',
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
