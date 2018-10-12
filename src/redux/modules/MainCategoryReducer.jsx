// ------------------------------------
// Selectors
// ------------------------------------
export const getIsLoading = state => state.mainCategory.isLoading;

export const getMainCategories = state => state.mainCategory.mainCategories;


// ------------------------------------
// Action Types
// ------------------------------------
const MAIN_CATEGORY_IS_LOADING = 'MAIN_CATEGORY_IS_LOADING';
const RECEIVE_MAIN_CATEGORIES = 'RECEIVE_MAIN_CATEGORIES';
const GET_MAIN_CATEGORY_BY_ID = 'GET_MAIN_CATEGORY_BY_ID';
const ADD_MAIN_CATEGORY = 'ADD_MAIN_CATEGORY';
const UPDATE_MAIN_CATEGORY = 'UPDATE_MAIN_CATEGORY';
const DELETE_MAIN_CATEGORY = 'DELETE_MAIN_CATEGORY';


// ------------------------------------
// Action Creators
// ------------------------------------
const isLoading = status => ({
  type: MAIN_CATEGORY_IS_LOADING,
  status,
});

const receiveMainCategories = mainCategories => ({
  type: RECEIVE_MAIN_CATEGORIES,
  mainCategories,
});

const getMainCategoryById = id => ({
  type: GET_MAIN_CATEGORY_BY_ID,
  id,
});

const addMainCategory = mainCategory => ({
  type: ADD_MAIN_CATEGORY,
  mainCategory,
});

const updateMainCategory = mainCategory => ({
  type: UPDATE_MAIN_CATEGORY,
  mainCategory,
});

const deleteMainCategory = id => ({
  type: DELETE_MAIN_CATEGORY,
  id,
});


// ------------------------------------
// Async Action Creators
// ------------------------------------
const doLoadMainCategories = () => (dispatch, getState) => {
  dispatch(isLoading(true));
  setTimeout(() => {
    const {
      mainCategories,
    } = getState().mainCategory;
    dispatch(receiveMainCategories(mainCategories));
    dispatch(isLoading(false));
  }, 1000);
};

const doAddMainCategory = mainCategory => (dispatch) => {
  dispatch(addMainCategory(mainCategory));
};

const doUpdateMainCategory = mainCategory => (dispatch) => {
  dispatch(updateMainCategory(mainCategory));
};

const doDeleteMainCategory = id => (dispatch) => {
  dispatch(deleteMainCategory(id));
};


// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
  doLoadMainCategories,
  doAddMainCategory,
  doUpdateMainCategory,
  doDeleteMainCategory,
  getMainCategoryById,
};


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MAIN_CATEGORY_IS_LOADING]: (state, action) => (
    { ...state, isLoading: action.status }
  ),
  [RECEIVE_MAIN_CATEGORIES]: (state, action) => {
    const { mainCategories } = action;
    return { ...state, mainCategories };
  },
  [GET_MAIN_CATEGORY_BY_ID]: (state, action) => {
    return state.mainCategories.filter(mainCategory => mainCategory.id === action.id)[0];
  },
  [ADD_MAIN_CATEGORY]: (state, action) => {
    const mainCategories = [...state.mainCategories, action.mainCategory];
    return { ...state, mainCategories };
  },
  [UPDATE_MAIN_CATEGORY]: (state, action) => {
    const mainCategories = state.mainCategories.map(
      mainCategory => (
        mainCategory.id !== action.mainCategory.id ? mainCategory : action.mainCategory
      ),
    );
    return { ...state, mainCategories };
  },
  [DELETE_MAIN_CATEGORY]: (state, action) => {
    const mainCategories = state.mainCategories.filter(mainCategory => (
      mainCategory.id !== action.id
    ));
    return { ...state, mainCategories };
  },
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  mainCategories: [
    {
      id: 1,
      description: 'Wohnen',
      color: '#FF0000',
    },
    {
      id: 2,
      description: 'Haushalt',
      color: '#FF9900',
    },
    {
      id: 3,
      description: 'Gesundheit & Körper',
      color: '#FF0099',
    },
    {
      id: 4,
      description: 'Freizeit',
      color: '#FF9999',
    },
    {
      id: 5,
      description: 'Reisen',
      color: '#00FF00',
    },
    {
      id: 6,
      description: 'Versicherungen',
      color: '#99FF00',
    },
    {
      id: 7,
      description: 'Steuern',
      color: '#99FF99',
    },
    {
      id: 8,
      description: 'Sparen & Anlegen',
      color: '#0000FF',
    },
  ],
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
