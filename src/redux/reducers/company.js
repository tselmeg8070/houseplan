import {RECEIVE_COMPANIES} from "../actions/company";

export default function companyReducer(state={companies: {}}, action) {
    switch (action.type) {
        case RECEIVE_COMPANIES:
            return {
                ...state,
                companies: action.companies,
            };
        default:
            return state
    }
}
