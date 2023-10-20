import { SET_TECHNICIAN } from "../actions/actionTypes";

const initialState = {
    technicianArray: [],
}

const technicianReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TECHNICIAN:
            return {
                ...state,
                technicianArray: action.payload
            }
            break;
        default: return state
    }
}

export default technicianReducer