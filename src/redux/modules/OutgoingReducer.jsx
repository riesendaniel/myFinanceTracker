import history from '../../helper/history';
import {getOutgoingValues} from "../../helper/firebase";

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
            dispatch(getOutgoingValues());
            dispatch(isLoading(false));
        }, 1000);
    };
}

export const doAddOutgoing = entry => (dispatch) => {
    dispatch(addOutgoing(entry));
    history.push('/outgoings');
};

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
    doLoadOutgoings,
    doAddOutgoing
};

// ------------------------------------
// Action Types
// ------------------------------------
const ADD_OUTGOING = 'ADD_OUTGOING';

const OUTGOING_IS_LOADING = 'OUTGOING_IS_LOADING';

const LOADED_OUTGOINGS = 'LOADED_OUTGOINGS';

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

export function loadedOutgoings(outgoings) {
    return {type: LOADED_OUTGOINGS, payload: outgoings};
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_OUTGOING]: (state, action) => {
        return {...state, outgoings: [...state.outgoings, action.payload]};
    },
    [OUTGOING_IS_LOADING]: (state, action) => (
        {...state, isLoading: action.status}
    ),
    [LOADED_OUTGOINGS]: (state, action) => (
        {...state, outgoings: action.payload}
    )
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isLoading: false,
    outgoings: [
        /*{
            "id": "75d652ad-db2c-ba8d-c666-996c8f1e1111",
            "outgoingDate": "2018-08-01",
            "outgoingCategory": "Tanken",
            "outgoingTitle": "Benzin für mein Auto",
            "outgoingAmount": 100.00,
            "outgoingCurrency": "CHF"
        },
        {
            "id": "75d652ad-db2c-ba8d-c666-996c8f1e2222",
            "outgoingDate": "2018-07-05",
            "outgoingCategory": "Essen",
            "outgoingTitle": "Mitagessen",
            "outgoingAmount": 9.50,
            "outgoingCurrency": "CHF"
        }*/
    ]
};
export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}