import { GET_TECHNICIAN, SET_TECHNICIAN } from "../actions/actionTypes";

const initialState = {
    technicianArray: [],
    technicianName: [],
}

const technicianReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TECHNICIAN:
            return {
                ...state,
                technicianArray: action.payload
            }
            break;
        case SET_TECHNICIAN:
            return {
                ...state,
                technicianName: action.payload
            }
            break;
        default: return state
    }
}

export default technicianReducer