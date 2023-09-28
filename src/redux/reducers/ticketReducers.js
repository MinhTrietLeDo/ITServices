const { GET_TICKET } = require("../actions/actionTypes");

const initialTicket = {
    ticketArray: []
}

const ticketReducer = (state = initialTicket, action) => {
    switch (action.type) {
        case GET_TICKET:
            return {
                ...state,
                ticketArray:action.payload
            }
            break;
        default: return state
    }
};

export default ticketReducer