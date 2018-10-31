import {
  getCategoryValues,
  updateCategory,
  deleteCategory,
  addNewCategory,
} from '../database';

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
const doLoadMainCategories = () => {
  return (dispatch) => {
    dispatch(isLoading(true));
      getCategoryValues().then(mainCategories => {
        dispatch(receiveMainCategories(mainCategories));
        dispatch(isLoading(false));
      }).catch(error => {
        console.error(error)
        dispatch(isLoading(false));
      })
  };
}

export function doAddMainCategory(entry) {
  return (dispatch) => {
    addNewCategory(entry).then(entry => {
        dispatch(addMainCategory(entry));
      }
    ).catch(error => {
      console.error(error);
    });
  };
}

export function doUpdateMainCategory(entry) {
  return (dispatch) => {
    updateCategory(entry).then(entry => {
        dispatch(updateMainCategory(entry));
      }
    ).catch(error => {
      console.error(error)
    })
  };
}

export function doDeleteMainCategory(id) {
  return (dispatch) => {
    deleteCategory(id).then(() => {
        dispatch(deleteMainCategory(id));
      }
    );
  };
}

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
  mainCategories: [],
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
