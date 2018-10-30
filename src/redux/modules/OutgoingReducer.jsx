import history from '../../helper/history';
import {
  getOutgoingValues,
  addNewOutgoing,
  deleteOutgoing,
  updateOutgoing
} from '../database';

// ------------------------------------
// Selectors
// ------------------------------------

export const getOutgoings = state => state.outgoings.outgoings;

export const getIsLoading = state => state.outgoings.isLoading;

// ------------------------------------
// Async Action Creators
// ------------------------------------

export function doLoadOutgoings() {
  return (dispatch) => {
    dispatch(isLoading(true));
    setTimeout(() => {
      getOutgoingValues().then(outgoingList => {
        dispatch(loadedOutgoings(outgoingList));
        dispatch(isLoading(false));
      }).catch(error => {
        console.error(error);
        dispatch(isLoading(false));
      });
    }, 1000);
  };
}

export function doAddOutgoing(entry) {
  return (dispatch) => {
    addNewOutgoing(entry).then(entry => {
        dispatch(addOutgoing(entry));
        history.push('/outgoings');
      }
    );
  };
}

export function doUpdateOutgoing(entry) {
  return (dispatch) => {
    updateOutgoing(entry).then(entry => {
        dispatch(updateOutgoingEntry(entry));
        history.push('/outgoings');
      }
    ).catch(error => {
      console.error(error);
    });
  };
}

export function doDeleteOutgoing(id) {
  return (dispatch) => {
    deleteOutgoing(id).then(() => {
        dispatch(deleteOutgoingEntry(id));
        history.push('/outgoings');
      }
    );
  };
}

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  doLoadOutgoings,
  doAddOutgoing,
  doUpdateOutgoing,
  doDeleteOutgoing
};

// ------------------------------------
// Action Types
// ------------------------------------
const ADD_OUTGOING = 'ADD_OUTGOING';

const OUTGOING_IS_LOADING = 'OUTGOING_IS_LOADING';

const LOADED_OUTGOINGS = 'LOADED_OUTGOINGS';

const UPDATE_OUTGOING_ENTRY = 'UPDATE_OUTGOING_ENTRY';

const DELETE_OUTGOING_ENTRY = 'DELETE_OUTGOING_ENTRY';

// ------------------------------------
// Action Creators
// ------------------------------------
const addOutgoing = payload => ({
  type: ADD_OUTGOING,
  payload
});

const isLoading = status => ({
  type: OUTGOING_IS_LOADING,
  status,
});

const updateOutgoingEntry = entry => ({
  type: UPDATE_OUTGOING_ENTRY,
  entry,
});

const deleteOutgoingEntry = id => ({
  type: DELETE_OUTGOING_ENTRY,
  id,
});

function loadedOutgoings(outgoings) {
  return { type: LOADED_OUTGOINGS, payload: outgoings };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_OUTGOING]: (state, action) => {
    return { ...state, outgoings: [...state.outgoings, action.payload] };
  },
  [OUTGOING_IS_LOADING]: (state, action) => (
    { ...state, isLoading: action.status }
  ),
  [LOADED_OUTGOINGS]: (state, action) => (
    { ...state, outgoings: action.payload }
  ),
  [UPDATE_OUTGOING_ENTRY]: (state, action) => {
    const outgoing = state.outgoings.map(item => (item.id !== action.entry.id ? item : action.entry));
    return {...state, outgoing};
  },
  [DELETE_OUTGOING_ENTRY]: (state, action) => {
    const outgoing = state.outgoings.filter(entry => entry.id !== action.id);
    return {...state, outgoing};
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  outgoings: []
};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
