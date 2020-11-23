import userReducer from "./userReducer";
import channelReducer from "./channelReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    currentUser: userReducer,
    currentChannel: channelReducer,
});
