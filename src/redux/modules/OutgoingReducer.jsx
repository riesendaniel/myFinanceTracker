import history from '../../helper/history';
import {getOutgoingValues, addNewOutgoing} from "../../helper/firebase";

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
                console.error(error)
                dispatch(isLoading(false));
            })
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

function loadedOutgoings(outgoings) {
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
    outgoings: []
};
export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}