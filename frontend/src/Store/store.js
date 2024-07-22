import rootReducer from '../reducers/Index';
import {createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Import redux-thunk middleware

const store = createStore(rootReducer,applyMiddleware(thunk));
export default store;