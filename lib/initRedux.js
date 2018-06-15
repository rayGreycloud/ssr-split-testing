import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

let reducers = {};
let reduxStore = null;

// Check for Redux DevTools browser extension
let devtools = f => f;
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

function create(initialState = {}) {
  return createStore(
    combineReducers({
      // Setup reducers
      ...reducers
    }),
    initialState, // Hydrate the store with server data
    devtools
  );
}

export default function initStore(initialState) {
  // Create new store for every server request
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse store if client
  if (!redexStore) {
    reduxStore = create(initialState);
  }

  return reduxStore;
}
