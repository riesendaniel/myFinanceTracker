import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk';

const createStore = (initialState = {}) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createReduxStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
    return store;
}

export default createStore