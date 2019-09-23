import {combineReducers} from "redux";
import sessionReducer from './session';
import planReducer from './house';
import materialReducer from './material';
import companyReducer from './company';
import pageReducer from './page';
export default combineReducers({
    sessionState: sessionReducer,
    planState: planReducer,
    materialState: materialReducer,
    companyState: companyReducer,
    pageState: pageReducer,
});