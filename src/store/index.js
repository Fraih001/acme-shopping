import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';
import cart from './cart';
import product from './product';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const reducer = combineReducers({
  auth,
  cart,
  product
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
export * from './auth';
export * from './cart';
export * from './product';

