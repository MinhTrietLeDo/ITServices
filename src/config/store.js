import rootReducers from '../redux/reducers/rootReducers';
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducers, compose(applyMiddleware(thunk)));

export default store;
