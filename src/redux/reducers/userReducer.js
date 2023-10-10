import { SET_TOKEN, SET_USER, LOG_OUT } from "../actions/actionTypes";

const initialState = {
    isLoginedIn: false,
    token: '',
    userId: '',
    userObj: {},
    userProfile: {},
    ticketsId: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
            break;

        case SET_USER:
            return {
                ...state,
                userObj: action.payload.userGLPI,
                userProfile: action.payload.userProfile,
                isLoginedIn: true
            }
            break;

        case LOG_OUT:
            return {
                ...state,        
                isLoginedIn: false,
            }         
            break;

        default: return state;
    }
};


export default userReducer;