// ------------------------------------
// Selectors
// ------------------------------------

export const getOutgoings = state => {
    return state.reducerOne.outgoings;
};

// ------------------------------------
// Async Action Creators
// ------------------------------------

const doLoadOutgoings = () => (dispatch, getState) => {
    return {
        outgoings: getState.outgoings
    };
};


// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
    doLoadOutgoings,
};

// ------------------------------------
// Action Types
// ------------------------------------
const ADD_OUTGOING = 'ADD_OUTGOING';

// ------------------------------------
// Action Creators
// ------------------------------------
/*const addOutgoing = payload => ({
    type: ADD_OUTGOING,
    payload
});*/

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [ADD_OUTGOING]: (state, action) => {
        return {...state, outgoings: [...state.outgoings, action.payload]};
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    outgoings: [
        {
            "id": "1",
            "date": "17.08.2018",
            "categorie": "Tanken",
            "title": "Benzin für mein Auto",
            "amount": "100.00"
        },
        {
            "id": "2",
            "date": "20.08.2018",
            "categorie": "Essen",
            "title": "Mitagessen",
            "amount": "9.50"
        }
    ]
};
export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}