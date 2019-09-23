import {RECEIVE_PLANS} from "../actions/house";

export default function planReducer(state={plans: {}}, action) {
    switch (action.type) {
        case RECEIVE_PLANS:
            return {
                ...state,
                plans: action.plans,
            };
        default:
            return state
    }
}
