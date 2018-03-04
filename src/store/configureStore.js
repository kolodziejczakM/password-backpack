import { createStore } from 'redux'; // applyMiddleware - if middlewares needed, like redux-immutable-state...
import rootReducer from '../reducers';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant' (not installed)

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    // applyMiddleware(), // middlewares as argument here
  );
}
