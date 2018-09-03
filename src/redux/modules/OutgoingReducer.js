// ------------------------------------
// Selectors
// ------------------------------------

export const getOutgoings = state => {
    return state.outgoings;
};

// ------------------------------------
// Action Types
// ------------------------------------
const ADD_OUTGOING = 'ADD_OUTGOING';

// ------------------------------------
// Action Creators
// ------------------------------------
const addOutgoing = payload => ({
    type: ADD_OUTGOING,
    payload
});

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_OUTGOING]: (state, action) => {
        return {...state,  outgoings: [...state.outgoings, action.payload]};
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    outgoings: [],
};

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}