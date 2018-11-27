import {
  snapshotWatcher,
} from '../database';

const collection = 'users';

// ------------------------------------
// Selectors
// ------------------------------------
export const getCurrency = state => state.app.currency;
export const getMenuState = state => state.app.menuState;
export const getIsLoading = state => state.app.isLoading;
export const getUserRole = state => state.app.userRole;

// ------------------------------------
// Action Types
// ------------------------------------
const TOGGLE_MENU = 'TOGGLE_MENU';
const AUTH_IS_LOADING = 'AUTH_IS_LOADING';
const LOADED_USER_RIGHTS = 'LOADED_USER_RIGHTS';

// ------------------------------------
// Action Creators
// ------------------------------------
const toggleMenu = () => ({
  type: TOGGLE_MENU,
});

const isLoading = status => ({
  type: AUTH_IS_LOADING,
  status,
});

const loadedUserRights = users => ({
  type: LOADED_USER_RIGHTS,
  payload: users,
});



// ------------------------------------
// Async Action Creators
// ------------------------------------
const doLoadUserRights = snapshot => (dispatch) => {
  dispatch(isLoading(true));
  if (snapshot) {
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if(users) {
      dispatch(loadedUserRights(users));
      dispatch(isLoading(false));
    }
  }
};

const initializeAppWatcher = () => (dispatch) => {
  snapshotWatcher(collection, snapshot => dispatch(doLoadUserRights(snapshot)));
};

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  initializeAppWatcher,
  toggleMenu,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_MENU]: (state) => {
    let menuState;
    if (state.menuState === 'closed') {
      menuState = 'open';
    } else {
      menuState = 'closed';
    }
    return { ...state, menuState };
  },
  [AUTH_IS_LOADING]: (state, action) => (
    { ...state, isLoading: action.status }
  ),
  [LOADED_USER_RIGHTS]: (state, action) => (
    { ...state, userRole: action.payload[0].userRole }
  ),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currency: 'CHF',
  isLoading: false,
  userRole: '',
  menuState: 'closed',
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
