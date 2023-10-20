import { legacy_createStore as createStore, combineReducers, compose } from 'redux';
import userReducer from './userReducer';
import ticketReducer from './ticketReducers';
import technicianReducer from './technicianReducers';
import requesterReducer from './requesterReducer';

export default rootReducer = combineReducers({
    user: userReducer, 
    ticket: ticketReducer,
    technician: technicianReducer,
    requester: requesterReducer,
})