import moment from 'moment';
import {
  snapshotWatcher,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../database';
import history from '../../helper/history';
import stableSort from '../../helper/sorting';

const collection = 'outgoing';

// ------------------------------------
// Selectors
// ------------------------------------
export const getOutgoings = state => state.outgoings.outgoings;
export const getOutgoingsByCategory = state => state.outgoings.outgoingsByCategory;
export const getMostFrequentCategory = state => state.outgoings.mostFrequentCategory;
export const getCurrentMonthsOutgoingSum = state => state.outgoings.currentMonthsOutgoingSum;
export const getCurrentMonthsOutgoingsByCategory = (
  state => state.outgoings.currentMonthsOutgoingsByCategory
);
export const getLastTwelveMonthsOutgoingSum = state => state.outgoings.lastTwelveMonthsOutgoingSum;
export const getIsLoading = state => state.outgoings.isLoading;


// ------------------------------------
// Action Types
// ------------------------------------
const OUTGOING_IS_LOADING = 'OUTGOING_IS_LOADING';
const LOADED_OUTGOINGS = 'LOADED_OUTGOINGS';
const FILTER_OUTGOINGS_BY_CATEGORY = 'FILTER_OUTGOINGS_BY_CATEGORY';
const SET_MOST_FREQUENT_CATEGORY = 'SET_MOST_FREQUENT_CATEGORY';
const SET_CURRENT_MONTHS_OUTGOINGS = 'SET_CURRENT_MONTHS_OUTGOINGS';
const CALC_CURRENT_MONTHS_OUTGOING_SUM = 'CALC_CURRENT_MONTHS_OUTGOING_SUM';
const CALC_CURRENT_MONTHS_OUTGOINGS_BY_CATEGORY = 'CALC_CURRENT_MONTHS_OUTGOINGS_BY_CATEGORY';
const CALC_LAST_TWELVE_MONTHS_OUTGOING_SUM = 'CALC_LAST_TWELVE_MONTHS_OUTGOING_SUM';


// ------------------------------------
// Action Creators
// ------------------------------------
const isLoading = status => ({
  type: OUTGOING_IS_LOADING,
  status,
});

const loadedOutgoings = outgoings => ({
  type: LOADED_OUTGOINGS,
  payload: outgoings,
});

const filterOutgoingsByCategory = (outgoings, categories) => ({
  type: FILTER_OUTGOINGS_BY_CATEGORY,
  outgoings,
  categories,
});

const setMostFrequentCategory = outgoingsByCategory => ({
  type: SET_MOST_FREQUENT_CATEGORY,
  outgoingsByCategory,
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
  dispatch(filterOutgoingsByCategory(outgoings, categories));
  dispatch(calcCurrentMonthsOutgoingsByCategory(currentMonthsOutgoings, categories));
  const {
    outgoingsByCategory,
  } = getState().outgoings;
  dispatch(setMostFrequentCategory(outgoingsByCategory));
};

const doLoadOutgoings = snapshot => (dispatch, getState) => {
  dispatch(isLoading(true));
  if (snapshot) {
    const outgoings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(loadedOutgoings(outgoings));
    updateCalculatedElements(dispatch, getState);
  }
  dispatch(isLoading(false));
};

const initializeOutgoingWatcher = () => (dispatch) => {
  snapshotWatcher(collection, snapshot => dispatch(doLoadOutgoings(snapshot)));
};

const doAddOutgoing = entry => async (dispatch) => {
  dispatch(isLoading(true));
  await addDocument(collection, entry);
  dispatch(isLoading(false));
  history.push('/outgoings');
};

const doUpdateOutgoing = entry => async (dispatch) => {
  dispatch(isLoading(true));
  await updateDocument(collection, entry);
  dispatch(isLoading(false));
  history.push('/outgoings');
};

const doDeleteOutgoing = id => async (dispatch) => {
  dispatch(isLoading(true));
  await deleteDocument(collection, id);
  dispatch(isLoading(false));
};


// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  initializeOutgoingWatcher,
  doAddOutgoing,
  doUpdateOutgoing,
  doDeleteOutgoing,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [OUTGOING_IS_LOADING]: (state, action) => (
    { ...state, isLoading: action.status }
  ),
  [LOADED_OUTGOINGS]: (state, action) => {
    const outgoings = stableSort(
      action.payload,
      'outgoingTitle',
      'asc',
    );
    return { ...state, outgoings };
  },
  [FILTER_OUTGOINGS_BY_CATEGORY]: (state, action) => {
    const outgoingsByCategory = [];
    if (typeof action.categories !== 'undefined') {
      for (let i = 0; i < action.categories.length; i += 1) {
        const category = action.categories[i];
        const outgoings = action.outgoings.filter(
          outgoing => outgoing.outgoingCategoryId === category.id,
        );
        if (outgoings.length > 0) {
          outgoingsByCategory.push({
            id: category.id,
            category: category.description,
            disabled: category.disabled,
            outgoings,
          });
        }
      }
    }
    return { ...state, outgoingsByCategory };
  },
  [SET_MOST_FREQUENT_CATEGORY]: (state, action) => {
    let mostFrequentCategory = '';
    let highestCount = 0;
    for (let i = 0; i < action.outgoingsByCategory.length; i += 1) {
      const categoryOutgoings = action.outgoingsByCategory[i];
      if (!categoryOutgoings.disabled) {
        const count = categoryOutgoings.outgoings.length;
        if (count > highestCount) {
          highestCount = count;
          mostFrequentCategory = categoryOutgoings.id;
        }
      }
    }
    return { ...state, mostFrequentCategory };
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
        const outgoings = action.currentMonthsOutgoings.filter(
          outgoing => outgoing.outgoingCategoryId === category.id,
        );
        const amount = outgoings.reduce(
          (total, outgoing) => total + outgoing.outgoingAmount, 0,
        );
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
      const amount = outgoingsByMonth.reduce(
        (total, outgoing) => total + outgoing.outgoingAmount, 0,
      );
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
  isLoading: true,
  outgoings: [],
  outgoingsByCategory: [],
  mostFrequentCategory: null,
  currentMonthsOutgoings: [],
  currentMonthsOutgoingSum: null,
  currentMonthsOutgoingsByCategory: [],
  lastTwelveMonthsOutgoingSum: [],
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
