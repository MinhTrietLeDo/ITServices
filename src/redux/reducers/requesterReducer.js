import { GET_REQUESTER } from "../actions/actionTypes";

const initialState = {
    requesterArray: [],
}

const requesterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REQUESTER:
            return {
                ...state,
                requesterArray: action.payload
            }
            break;
        default: return state
    }
}

export default requesterReducer