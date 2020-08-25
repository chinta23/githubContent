import { combineReducers } from "redux";
import user from "./user";

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        user: user
    });
}
