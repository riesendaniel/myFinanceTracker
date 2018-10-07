import history from '../../helper/history';

// ------------------------------------
// Selectors
// ------------------------------------

export const getIsLoading = state => state.budget.isLoading;

export const getIsBudgetGroupFormOpen = state => state.budget.isBudgetGroupFormOpen;

export const getBudgetGroups = state => state.budget.budgetGroups;

export const getBudget = state => state.budget.budget;


// ------------------------------------
// Action Types
// ------------------------------------
const BUDGET_IS_LOADING = 'BUDGET_IS_LOADING';
const BUDGET_GROUP_FORM_IS_OPEN = 'BUDGET_GROUP_FORM_IS_OPEN';
const RECEIVE_BUDGET_GROUPS = 'RECEIVE_BUDGET_GROUPS';
const RECEIVE_BUDGET = 'RECEIVE_BUDGET';
const ADD_BUDGET_GROUP = 'ADD_BUDGET_GROUP';
const ADD_BUDGET_ENTRY = 'ADD_BUDGET_ENTRY';
const UPDATE_BUDGET_ENTRY = 'UPDATE_BUDGET_ENTRY';
const DELETE_BUDGET_ENTRY = 'DELETE_BUDGET_ENTRY';


// ------------------------------------
// Action Creators
// ------------------------------------
const isLoading = status => ({
  type: BUDGET_IS_LOADING,
  status,
});

const budgetGroupFormIsOpen = isOpen => ({
  type: BUDGET_GROUP_FORM_IS_OPEN,
  isOpen,
});

const receiveBudgetGroups = budgetGroups => ({
  type: RECEIVE_BUDGET_GROUPS,
  budgetGroups,
});

const receiveBudget = budget => ({
  type: RECEIVE_BUDGET,
  budget,
});

const addBudgetGroup = groupName => ({
  type: ADD_BUDGET_GROUP,
  groupName,
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

const doLoadBudgetGroups = () => (dispatch, getState) => {
  dispatch(isLoading(true));
  setTimeout(() => {
    const { budgetGroups } = getState().budget;
    dispatch(isLoading(false));
    return dispatch(receiveBudgetGroups(budgetGroups));
  }, 1000);
};

const doLoadBudget = () => (dispatch, getState) => {
  dispatch(isLoading(true));
  setTimeout(() => {
    const { budget } = getState().budget;
    dispatch(isLoading(false));
    return dispatch(receiveBudget(budget));
  }, 1000);
};

export const doAddBudgetGroup = groupName => (
  addBudgetGroup(groupName)
);

export const doAddBudgetEntry = entry => (dispatch) => {
  dispatch(addBudgetEntry(entry));
  history.push('/budget');
};

export const doUpdateBudgetEntry = entry => (dispatch) => {
  dispatch(updateBudgetEntry(entry));
  history.push('/budget');
};

export const doDeleteBudgetEntry = id => (
  deleteBudgetEntry(id)
);


// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  doLoadBudgetGroups,
  doLoadBudget,
  doAddBudgetGroup,
  doAddBudgetEntry,
  doUpdateBudgetEntry,
  doDeleteBudgetEntry,
  budgetGroupFormIsOpen,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BUDGET_IS_LOADING]: (state, action) => (
    { ...state, isLoading: action.status }
  ),
  [BUDGET_GROUP_FORM_IS_OPEN]: (state, action) => (
    { ...state, isBudgetGroupFormOpen: action.isOpen }
  ),
  [RECEIVE_BUDGET_GROUPS]: (state, action) => {
    const budgetGroups = [...action.budgetGroups];
    return { ...state, budgetGroups };
  },
  [RECEIVE_BUDGET]: (state, action) => {
    const budget = [...action.budget];
    return { ...state, budget };
  },
  [ADD_BUDGET_GROUP]: (state, action) => {
    const budgetGroups = [...state.budgetGroups, action.groupName];
    return { ...state, budgetGroups };
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
  isBudgetGroupFormOpen: false,
  budgetGroups: [
    'Wohnen',
    'Haushalt',
    'Gesundheit & Körper',
    'Freizeit',
    'Reisen',
    'Versicherungen',
    'Steuern',
    'Sparen & Anlegen',
  ],
  budget: [
    {
      id: 1,
      group: 'Haushalt',
      category: 'Unterhalt',
      period: 'monthly',
      monthly: 100,
      yearly: 1200,
    },
    {
      id: 2,
      group: 'Haushalt',
      category: 'Essen & Getränke',
      period: 'monthly',
      monthly: 250,
      yearly: 3000,
    },
    {
      id: 3,
      group: 'Mobilität',
      category: 'öffentlicher Verkehr',
      period: 'yearly',
      monthly: 200,
      yearly: 2400,
    },
  ],
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
