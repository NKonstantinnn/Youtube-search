import { createStore, combineReducers, compose } from 'redux';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;