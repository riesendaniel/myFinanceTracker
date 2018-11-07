// ------------------------------------
// Selectors
// ------------------------------------

export const getCurrency = state => state.app.currency;

export const getMenuState = state => state.app.menuState;


// ------------------------------------
// Action Types
// ------------------------------------
const TOGGLE_MENU = 'TOGGLE_MENU';


// ------------------------------------
// Action Creators
// ------------------------------------
const toggleMenu = () => ({
  type: TOGGLE_MENU,
});


// ------------------------------------
// Async Action Creators
// ------------------------------------


// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  toggleMenu,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOGGLE_MENU]: (state) => {
    let menuState;
    if (state.menuState === 'closed') {
      menuState = 'open';
    } else {
      menuState = 'closed';
    }
    return { ...state, menuState };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currency: 'CHF',
  menuState: 'closed',
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
