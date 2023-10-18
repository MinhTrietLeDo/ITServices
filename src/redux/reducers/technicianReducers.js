import { SET_TECHNICIAN } from "../actions/actionTypes";

const initialState = {
    userId: '',
    userObj: {},
}

const technicianReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TECHNICIAN:
            return {
                ...state,
                // token: action.payload
            }
            break;
        default: return state
    }
}

export default technicianReducer