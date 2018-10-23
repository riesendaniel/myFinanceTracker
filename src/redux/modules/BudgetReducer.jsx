import history from '../../helper/history';
import {addNewBudget, deleteBudget, getBudgetValues, updateBudget} from "../../helper/firebase";

// ------------------------------------
// Selectors
// ------------------------------------

export const getIsLoading = state => state.budget.isLoading;

export const getBudget = state => state.budget.budget;

export const getCategories = state => state.budget.categories;


// ------------------------------------
// Action Types
// ------------------------------------
const BUDGET_IS_LOADING = 'BUDGET_IS_LOADING';
const RECEIVE_BUDGET = 'RECEIVE_BUDGET';
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
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

const receiveBudget = budget => ({
    type: RECEIVE_BUDGET,
    budget,
});

const loadCategories = () => ({
    type: LOAD_CATEGORIES,
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
const doLoadBudget = () => {
    return (dispatch) => {
        dispatch(isLoading(true));
        setTimeout(() => {
            getBudgetValues().then(budget => {
                dispatch(receiveBudget(budget));
                dispatch(isLoading(false));
            }).catch(error => {
                console.error(error)
                dispatch(isLoading(false));
            })
        }, 1000);
    };
}

export function doAddBudgetEntry(entry) {
    return (dispatch) => {
        addNewBudget(entry).then(entry => {
                console.log('ok');
                dispatch(addBudgetEntry(entry));
                dispatch(loadCategories());
                history.push('/budget');
            }
        ).catch(error => {
            console.log('nok');
            console.error(error);
        });
    };
}

export function doUpdateBudgetEntry(entry) {
    return (dispatch) => {
        updateBudget(entry).then(entry => {
                dispatch(updateBudgetEntry(entry));
                dispatch(loadCategories());
                history.push('/budget');
            }
        ).catch(error => {
            console.error(error)
        })
    };
}

export function doDeleteBudgetEntry(id) {
    return (dispatch) => {
        deleteBudget(id).then(() => {
                dispatch(deleteBudgetEntry(id));
                dispatch(loadCategories());
            }
        );
    };
}

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
    doLoadBudget,
    doAddBudgetEntry,
    doUpdateBudgetEntry,
    doDeleteBudgetEntry,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [BUDGET_IS_LOADING]: (state, action) => (
        {...state, isLoading: action.status}
    ),
    [RECEIVE_BUDGET]: (state, action) => {
        const budget = [...action.budget];
        return {...state, budget};
    },
    [LOAD_CATEGORIES]: (state) => {
        const categories = [];
        for (let i = 0; i < state.budget.length; i += 1) {
            const budgetEntry = state.budget[i];
            categories.push({
                id: budgetEntry.id,
                description: budgetEntry.category,
            });
        }
        return {...state, categories};
    },
    [ADD_BUDGET_ENTRY]: (state, action) => {
        const budget = [...state.budget, action.entry];
        return {...state, budget};
    },
    [UPDATE_BUDGET_ENTRY]: (state, action) => {
        const budget = state.budget.map(item => (item.id !== action.entry.id ? item : action.entry));
        return {...state, budget};
    },
    [DELETE_BUDGET_ENTRY]: (state, action) => {
        const budget = state.budget.filter(entry => entry.id !== action.id);
        return {...state, budget};
    },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isLoading: false,
    categories: [],
    budget: [],
};

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
