import moment from 'moment';
import history from '../../helper/history';

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

const doLoadOutgoings = () => (dispatch, getState) => {
    dispatch(isLoading(true));
    setTimeout(() => {
        const result = {outgoings: getState().outgoings};
        updateCalculatedElements(dispatch, getState);
        dispatch(isLoading(false));
        return result;
    }, 1000);
};

export const doAddOutgoing = entry => (dispatch, getState) => {
    dispatch(addOutgoing(entry));
    updateCalculatedElements(dispatch, getState);
    history.push('/outgoings');
};

export function doUpdateOutgoing(entry) {
    return (dispatch) => {
        console.log('Eintrag wurde geändert: ' + entry);
        history.push('/outgoings');
    };
}

export function doDeleteOutgoing(id) {
    return (dispatch) => {
        console.log('Eintrag wurde gelöscht: ' + id);
        history.push('/outgoings');
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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_OUTGOING]: (state, action) => {
        return {...state, outgoings: [...state.outgoings, action.payload]};
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
    [OUTGOING_IS_LOADING]: (state, action) => (
        {...state, isLoading: action.status}
    )
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isLoading: false,
    outgoings: [
        {
            "id": "75d652ad-db2c-ba8d-c666-996c8f1e1111",
            "outgoingDate": "2018-08-01",
            "outgoingCategoryId": 4,
            "outgoingTitle": "Benzin für mein Auto",
            "outgoingAmount": 100.00,
        },
        {
            "id": "75d652ad-db2c-ba8d-c666-996c8f1e2222",
            "outgoingDate": "2018-07-05",
            "outgoingCategoryId": 2,
            "outgoingTitle": "Mitagessen",
            "outgoingAmount": 9.50,
        },
    ],
    currentMonthsOutgoings: [],
    currentMonthsOutgoingSum: null,
    currentMonthsOutgoingsByCategory: [],
    lastTwelveMonthsOutgoingSum: [],
};
export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
