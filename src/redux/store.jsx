import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const createStore = (initialState = {}) => {
  /* eslint no-underscore-dangle:
     ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] } ] */
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
};

export default createStore;
