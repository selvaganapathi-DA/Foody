import { combineReducers } from 'redux';
import productReducer from './ProductReducers';

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
