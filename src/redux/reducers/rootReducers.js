import { legacy_createStore as createStore, combineReducers, compose } from 'redux';
import userReducer from './userReducer';
import ticketReducer from './ticketReducers';
import technicianReducer from './technicianReducers';

export default rootReducer = combineReducers({
    user: userReducer, 
    ticket: ticketReducer,
    technician: technicianReducer
})