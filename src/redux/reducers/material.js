import {RECEIVE_MATERIALS} from "../actions/material";

export default function companyReducer(state = {materials: {}}, action) {
    switch (action.type) {
        case RECEIVE_MATERIALS:
            return {
                ...state,
                materials: action.materials,
            };
        default:
            return state
    }
}
