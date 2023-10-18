import { GET_TECHNICIAN, GET_TICKET, GET_USER, LOG_OUT, SET_TECHNICIAN, SET_TOKEN, SET_USER } from "./actionTypes";
export const setSessionToken = (param) => ({
    type: SET_TOKEN,
    payload: param
});

export const setUserObject = (param) => ({
    type: SET_USER,
    payload: param
});

export const getTicket = (param) => ({
    type: GET_TICKET,
    payload: param
})

export const getUserID = (param) => ({
    type: GET_USER,
    payload: param
})

export const logOutUser = () => ({
    type: LOG_OUT,
})

export const setTechnician = (param) => ({
    type: SET_TECHNICIAN,
    payload: param
})

export const getTechnician = (param) => ({
    type: GET_TECHNICIAN,
    payload: param
})