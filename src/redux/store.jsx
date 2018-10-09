import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import {init as firebaseInit} from '../helper/firebase'

const createStore = (initialState = {}) => {
  /* eslint no-underscore-dangle:
     ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] } ] */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  firebaseInit();
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
};

export default createStore;
