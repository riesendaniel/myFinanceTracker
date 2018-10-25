import history from '../../helper/history';

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
export const ADD_BUDGET_ENTRY = 'ADD_BUDGET_ENTRY';
export const UPDATE_BUDGET_ENTRY = 'UPDATE_BUDGET_ENTRY';
export const DELETE_BUDGET_ENTRY = 'DELETE_BUDGET_ENTRY';


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

const addBudgetEntry = entry => ({
  type: ADD_BUDGET_ENTRY,
  entry,
});

const updateBudgetEntry = entry => ({
  type: UPDATE_BUDGET_ENTRY,
  entry,
});

const deleteBudgetEntry = id => ({
  type: DELETE_BUDGET_ENTRY,
  id,
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

const doLoadBudget = () => (dispatch, getState) => {
  dispatch(isLoading(true));
  setTimeout(() => {
    const { budget } = getState().budget;
    dispatch(receiveBudget(budget));
    updateCalculatedElements(dispatch, getState);
    dispatch(isLoading(false));
  }, 1000);
};

export const doAddBudgetEntry = entry => (dispatch, getState) => {
  dispatch(addBudgetEntry(entry));
  updateCalculatedElements(dispatch, getState);
  history.push('/budget');
};

export const doUpdateBudgetEntry = entry => (dispatch, getState) => {
  dispatch(updateBudgetEntry(entry));
  updateCalculatedElements(dispatch, getState);
  history.push('/budget');
};

export const doDeleteBudgetEntry = id => (dispatch, getState) => {
  dispatch(deleteBudgetEntry(id));
  updateCalculatedElements(dispatch, getState);
};


// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  doLoadBudget,
  doAddBudgetEntry,
  doUpdateBudgetEntry,
  doDeleteBudgetEntry,
  isLoading,
  receiveBudget,
  loadCategories,
  addBudgetEntry,
  updateBudgetEntry,
  deleteBudgetEntry,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BUDGET_IS_LOADING]: (state, action) => (
    { ...state, isLoading: action.status }
  ),
  [RECEIVE_BUDGET]: (state, action) => {
    const budget = [...action.budget];
    return { ...state, budget };
  },
  [LOAD_CATEGORIES]: (state) => {
    const categories = [];
    for (let i = 0; i < state.budget.length; i += 1) {
      const budgetEntry = state.budget[i];
      categories.push({
        id: budgetEntry.id,
        description: budgetEntry.category,
        color: budgetEntry.color,
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
  [ADD_BUDGET_ENTRY]: (state, action) => {
    const budget = [...state.budget, action.entry];
    return { ...state, budget };
  },
  [UPDATE_BUDGET_ENTRY]: (state, action) => {
    const budget = state.budget.map(item => (item.id !== action.entry.id ? item : action.entry));
    return { ...state, budget };
  },
  [DELETE_BUDGET_ENTRY]: (state, action) => {
    const budget = state.budget.filter(entry => entry.id !== action.id);
    return { ...state, budget };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  categories: [],
  budget: [
    {
      id: 1,
      mainCategoryId: 2,
      category: 'Unterhalt',
      color: '#FF0000',
      period: 'monthly',
      monthly: 100,
      yearly: 1200,
    },
    {
      id: 2,
      mainCategoryId: 2,
      category: 'Essen & Getränke',
      color: '#FF9900',
      period: 'monthly',
      monthly: 250,
      yearly: 3000,
    },
    {
      id: 3,
      mainCategoryId: 9,
      category: 'öffentlicher Verkehr',
      color: '#FF0099',
      period: 'yearly',
      monthly: 200,
      yearly: 2400,
    },
    {
      id: 4,
      mainCategoryId: 5,
      category: 'Tanken',
      color: '#FF9999',
      period: 'monthly',
      monthly: 100,
      yearly: 1200,
    },
  ],
  monthlyBudgetSum: null,
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
