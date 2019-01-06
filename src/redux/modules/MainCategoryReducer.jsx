import {
  snapshotWatcher,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../database';
import stableSort from '../../helper/sorting';

const collection = 'categories';

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


// ------------------------------------
// Async Action Creators
// ------------------------------------
const doLoadMainCategories = snapshot => (dispatch) => {
  dispatch(isLoading(true));
  if (snapshot) {
    const mainCategories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(receiveMainCategories(mainCategories));
  }
  dispatch(isLoading(false));
};

let unregisterSnapshotWatcher;
const initializeMainCategoryWatcher = () => (dispatch) => {
  unregisterSnapshotWatcher = snapshotWatcher(
    collection,
    snapshot => dispatch(doLoadMainCategories(snapshot)),
  );
};
export const unregisterMainCategoryWatcher = () => unregisterSnapshotWatcher();

const doAddMainCategory = entry => async (dispatch) => {
  dispatch(isLoading(true));
  await addDocument(collection, entry);
  dispatch(isLoading(false));
};

const doUpdateMainCategory = entry => async (dispatch) => {
  dispatch(isLoading(true));
  await updateDocument(collection, entry);
  dispatch(isLoading(false));
};

const doDeleteMainCategory = id => async (dispatch) => {
  dispatch(isLoading(true));
  await deleteDocument(collection, id);
  dispatch(isLoading(false));
};


// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
  initializeMainCategoryWatcher,
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
    let { mainCategories } = action;
    mainCategories = stableSort(
      mainCategories,
      'description',
      'asc',
    );
    return { ...state, mainCategories };
  },
  [GET_MAIN_CATEGORY_BY_ID]: (state, action) => (
    state.mainCategories.filter(mainCategory => mainCategory.id === action.id)[0]
  ),
};


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: true,
  mainCategories: [],
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
