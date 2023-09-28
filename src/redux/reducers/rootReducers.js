import { legacy_createStore as createStore, combineReducers, compose } from 'redux';
import userReducer from './userReducer';
import ticketReducer from './ticketReducers';

export default rootReducer = combineReducers({
    user: userReducer, 
    ticket: ticketReducer,
})