import history from '../../helper/history';
import {
  snapshotWatcher,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../database';

const collection = 'budget';

// ------------------------------------
// Selectors
// ------------------------------------

export const getIsLoading = state => state.budget.isLoading;
export const getBudget = state => state.budget.budget;
export const getCategories = state => state.budget.categories;
export const getMonthlyBudgetSum = state => state.budget.monthlyBudgetSum;


// ------------------------------------
// Action Types
// ------------------------------------
export const BUDGET_IS_LOADING = 'BUDGET_IS_LOADING';
export const RECEIVE_BUDGET = 'RECEIVE_BUDGET';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const CALC_MONTHLY_BUDGET_SUM = 'CALC_MONTHLY_BUDGET_SUM';


// ------------------------------------
// Action Creators
// ------------------------------------
const isLoading = status => ({
  type: BUDGET_IS_LOADING,
  status,
});

const receiveBudget = budget => ({
  type: RECEIVE_BUDGET,
  budget,
});

const loadCategories = () => ({
  type: LOAD_CATEGORIES,
});

const calcMonthlyBudgetSum = budget => ({
  type: CALC_MONTHLY_BUDGET_SUM,
  budget,
});


// ------------------------------------
// Async Action Creators
// ------------------------------------
const updateCalculatedElements = (dispatch, getState) => {
  const {
    budget,
  } = getState().budget;
  dispatch(calcMonthlyBudgetSum(budget));
  dispatch(loadCategories());
};

const doLoadBudget = snapshot => (dispatch, getState) => {
  dispatch(isLoading(true));
  if (snapshot) {
    const budget = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(receiveBudget(budget));
    updateCalculatedElements(dispatch, getState);
  }
  dispatch(isLoading(false));
};

const initializeBudgetWatcher = () => (dispatch) => {
  snapshotWatcher(collection, snapshot => dispatch(doLoadBudget(snapshot)));
};

const doAddBudgetEntry = entry => async (dispatch) => {
  dispatch(isLoading(true));
  await addDocument(collection, entry);
  dispatch(isLoading(false));
  history.push('/budget');
};

const doUpdateBudgetEntry = entry => async (dispatch) => {
  dispatch(isLoading(true));
  await updateDocument(collection, entry);
  dispatch(isLoading(false));
  history.push('/budget');
};

const doDeleteBudgetEntry = id => async (dispatch) => {
  dispatch(isLoading(true));
  await deleteDocument(collection, id);
  dispatch(isLoading(false));
};

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  initializeBudgetWatcher,
  doAddBudgetEntry,
  doUpdateBudgetEntry,
  doDeleteBudgetEntry,
  isLoading,
  receiveBudget,
  loadCategories,
  calcMonthlyBudgetSum,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BUDGET_IS_LOADING]: (state, action) => (
    { ...state, isLoading: action.status }
  ),
  [RECEIVE_BUDGET]: (state, action) => {
    const budget = action.budget.filter(budgetEntry => !budgetEntry.disabled);
    const budgetHistory = [...action.budget];
    return { ...state, budget, budgetHistory };
  },
  [LOAD_CATEGORIES]: (state) => {
    const categories = [];
    for (let i = 0; i < state.budgetHistory.length; i += 1) {
      const budgetEntry = state.budgetHistory[i];
      categories.push({
        id: budgetEntry.id,
        description: budgetEntry.category,
        color: budgetEntry.color,
        disabled: budgetEntry.disabled,
      });
    }
    return { ...state, categories };
  },
  [CALC_MONTHLY_BUDGET_SUM]: (state, action) => {
    const monthlyBudgetSum = action.budget.reduce((total, budgetEntry) => (
      total + budgetEntry.monthly
    ), 0);
    return { ...state, monthlyBudgetSum };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: true,
  categories: [],
  budget: [],
  budgetHistory: [],
  monthlyBudgetSum: null,
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
