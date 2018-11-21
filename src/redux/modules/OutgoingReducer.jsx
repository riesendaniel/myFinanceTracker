import moment from 'moment';
import history from '../../helper/history';
import {
  getOutgoingValues,
  addNewOutgoing,
  deleteOutgoing,
  updateOutgoing
} from '../database';
import { addMessage } from '../../components/Notifier';

// ------------------------------------
// Selectors
// ------------------------------------

export const getOutgoings = state => state.outgoings.outgoings;
export const getCurrentMonthsOutgoingSum = state => state.outgoings.currentMonthsOutgoingSum;
export const getCurrentMonthsOutgoingsByCategory = state => state.outgoings.currentMonthsOutgoingsByCategory;
export const getLastTwelveMonthsOutgoingSum = state => state.outgoings.lastTwelveMonthsOutgoingSum;
export const getIsLoading = state => state.outgoings.isLoading;

// ------------------------------------
// Async Action Creators
// ------------------------------------

const updateCalculatedElements = (dispatch, getState) => {
  const {
    outgoings,
  } = getState().outgoings;
  dispatch(setCurrentMonthsOutgoings(outgoings));
  dispatch(calcLastTwelveMonthsOutgoingSum(outgoings));
  const {
    currentMonthsOutgoings,
  } = getState().outgoings;
  dispatch(calcCurrentMonthsOutgoingSum(currentMonthsOutgoings));
  const {
    categories,
  } = getState().budget;
  dispatch(calcCurrentMonthsOutgoingsByCategory(currentMonthsOutgoings, categories));
}

export function doLoadOutgoings() {
  return (dispatch, getState) => {
    dispatch(isLoading(true));
    getOutgoingValues().then(outgoingList => {
      dispatch(loadedOutgoings(outgoingList));
      updateCalculatedElements(dispatch, getState);
      dispatch(isLoading(false));
    }).catch(error => {
      addMessage({ message: 'Ausgaben konnten nicht geladen werden' });
      console.error(error);
      dispatch(isLoading(false));
    });
  };
}


export function doAddOutgoing(entry) {
  return (dispatch, getState) => {
    addNewOutgoing(entry).then((entry) => {
        dispatch(addOutgoing(entry));
        updateCalculatedElements(dispatch, getState);
        history.push('/outgoings');
      }
    ).catch(error => {
      addMessage({ message: 'Ausgabe konnte nicht gespeichert werden' });
      console.error(error);
    });
  };
}

export function doUpdateOutgoing(entry) {
  return (dispatch) => {
    updateOutgoing(entry).then(() => {
        dispatch(updateOutgoingEntry(entry));
        history.push('/outgoings');
      }
    ).catch(error => {
      addMessage({ message: 'Ausgabe konnten nicht geändert werden' });
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
    ).catch(error => {
      addMessage({ message: 'Ausgabe konnte nicht gelöscht werden' });
      console.error(error);
    });
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
const SET_CURRENT_MONTHS_OUTGOINGS = 'SET_CURRENT_MONTHS_OUTGOINGS';
const CALC_CURRENT_MONTHS_OUTGOING_SUM = 'CALC_CURRENT_MONTHS_OUTGOING_SUM';
const CALC_CURRENT_MONTHS_OUTGOINGS_BY_CATEGORY = 'CALC_CURRENT_MONTHS_OUTGOINGS_BY_CATEGORY';
const CALC_LAST_TWELVE_MONTHS_OUTGOING_SUM = 'CALC_LAST_TWELVE_MONTHS_OUTGOING_SUM';

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

const setCurrentMonthsOutgoings = outgoings => ({
    type: SET_CURRENT_MONTHS_OUTGOINGS,
    outgoings,
});

const calcCurrentMonthsOutgoingSum = currentMonthsOutgoings => ({
    type: CALC_CURRENT_MONTHS_OUTGOING_SUM,
    currentMonthsOutgoings,
});

const calcCurrentMonthsOutgoingsByCategory = (currentMonthsOutgoings, categories) => ({
    type: CALC_CURRENT_MONTHS_OUTGOINGS_BY_CATEGORY,
    currentMonthsOutgoings,
    categories,
});

const calcLastTwelveMonthsOutgoingSum = outgoings => ({
    type: CALC_LAST_TWELVE_MONTHS_OUTGOING_SUM,
    outgoings,
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
    const outgoings = state.outgoings.map(item => (item.id !== action.entry.id ? item : action.entry));
    return { ...state, outgoings };
  },
  [DELETE_OUTGOING_ENTRY]: (state, action) => {
    const outgoings = state.outgoings.filter(entry => entry.id !== action.id);
    return { ...state, outgoings };
  },
  [SET_CURRENT_MONTHS_OUTGOINGS]: (state, action) => {
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');
    const currentMonthsOutgoings = action.outgoings.filter(outgoing => moment(outgoing.outgoingDate).isBetween(startOfMonth, endOfMonth, 'day', '[]'));
    return { ...state, currentMonthsOutgoings };
  },
  [CALC_CURRENT_MONTHS_OUTGOING_SUM]: (state, action) => {
    const currentMonthsOutgoingSum = action.currentMonthsOutgoings.reduce(
      (total, outgoing) => total + outgoing.outgoingAmount, 0,
    );
    return { ...state, currentMonthsOutgoingSum };
  },
  [CALC_CURRENT_MONTHS_OUTGOINGS_BY_CATEGORY]: (state, action) => {
    const currentMonthsOutgoingsByCategory = [];
    if (typeof action.categories !== 'undefined') {
      for (let i = 0; i < action.categories.length; i += 1) {
        const category = action.categories[i];
        const outgoings = action.currentMonthsOutgoings.filter(outgoing => outgoing.outgoingCategory === category.description);
        const amount = outgoings.reduce((total, outgoing) => total + outgoing.outgoingAmount, 0);
        if (amount !== 0) {
          currentMonthsOutgoingsByCategory.push({
            id: category.id,
            category: category.description,
            color: category.color,
            amount,
          });
        }
      }
    }
    return { ...state, currentMonthsOutgoingsByCategory };
  },
  [CALC_LAST_TWELVE_MONTHS_OUTGOING_SUM]: (state, action) => {
    const lastTwelveMonthsOutgoingSum = [];
    for (let i = 11; i >= 0; i -= 1) {
      const month = moment().startOf('month').subtract(i, 'months');
      const startOfMonth = moment(month).startOf('month');
      const endOfMonth = moment(month).endOf('month');
      const outgoingsByMonth = action.outgoings.filter(outgoing => moment(outgoing.outgoingDate).isBetween(startOfMonth, endOfMonth, 'day', '[]'));
      const amount = outgoingsByMonth.reduce((total, outgoing) => total + outgoing.outgoingAmount, 0);
      lastTwelveMonthsOutgoingSum.push({
        id: i,
        month: moment(month).format('MMM \'YY'),
        amount,
      });
    }
    return { ...state, lastTwelveMonthsOutgoingSum };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isLoading: false,
    outgoings: [],
    currentMonthsOutgoings: [],
    currentMonthsOutgoingSum: null,
    currentMonthsOutgoingsByCategory: [],
    lastTwelveMonthsOutgoingSum: [],
};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}