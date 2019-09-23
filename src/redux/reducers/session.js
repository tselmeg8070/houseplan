import {SET_AUTH_USER} from "../actions/session";

const INITIAL_STATE = {
    authUser: null,
};

function sessionReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                authUser: action.authUser
            };
        default:
            return state;
    }
}
export default sessionReducer;
