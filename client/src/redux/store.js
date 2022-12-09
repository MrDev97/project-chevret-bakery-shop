import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './usersRedux';
import productsReducer from './productsRedux';
import cartReducer from './cartRedux';

const subreducers = {
  users: usersReducer,
  products: productsReducer,
  cart: cartReducer,
};

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  ),
);

export default store;
