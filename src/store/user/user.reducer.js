import { USER_ACTION_TYPES}  from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}
// since we are not using useReducer here we need to mention "state = INITIAL_STATE" for the first time execution.
export const userReducer = (state = INITIAL_STATE, action) => {
    
    // action has 2 parameter i.e type and payload
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
}
