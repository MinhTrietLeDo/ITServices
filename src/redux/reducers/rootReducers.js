import { legacy_createStore as createStore, combineReducers, compose } from 'redux';
import userReducer from './userReducer';

export default rootReducer = combineReducers({
    user: userReducer,
})