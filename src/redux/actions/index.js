import {
  GET_USER,
  LOG_OUT,
  SET_TOKEN,
  SET_USER,
} from './actionTypes';
export const setSessionToken = param => ({
  type: SET_TOKEN,
  payload: param,
});

export const setUserObject = param => ({
  type: SET_USER,
  payload: param,
});

export const getUserID = param => ({
  type: GET_USER,
  payload: param,
});

export const logOutUser = () => ({
  type: LOG_OUT,
});
