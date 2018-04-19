import {combineReducers} from "redux";

import {authentication} from "./authentication.reducer";
import {registration} from "./registration.reducer";
import {users} from "./users.reducer";
import {alert} from "./alert.reducer";
import chat from "./chatReducer";
import settings from "./sideNav.reducer";
const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    chat,
    settings,
});

export default rootReducer;