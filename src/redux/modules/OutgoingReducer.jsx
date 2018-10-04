// ------------------------------------
// Selectors
// ------------------------------------

export const getOutgoings = state => state.outgoings.outgoings;

export const getIsLoading = state => state.outgoings.isLoading;

// ------------------------------------
// Async Action Creators
// ------------------------------------

const doLoadOutgoings = () => (dispatch, getState) => {
    dispatch(isLoading(true));
    setTimeout(() => {

        const result = {outgoings: getState().outgoings};
        dispatch(isLoading(false));
        return result;
    }, 1000);
};

export const doAddOutgoing = entry => (
    addOutgoing(entry)
);

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

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_OUTGOING]: (state, action) => {
        return {...state, outgoings: [...state.outgoings, action.payload]};
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
            "outgoingDate": "17.08.2018",
            "outgoingCategory": "Tanken",
            "outgoingTitle": "Benzin für mein Auto",
            "outgoingAmount": "100.00"
        },
        {
            "id": "75d652ad-db2c-ba8d-c666-996c8f1e2222",
            "outgoingDate": "20.08.2018",
            "outgoingCategory": "Essen",
            "outgoingTitle": "Mitagessen",
            "outgoingAmount": "9.50"
        }
    ]
};
export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}