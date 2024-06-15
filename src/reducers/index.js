import { combineReducers } from "redux";

import authReducer from "./authReducers";
import postReducer from "./postReducers";
import chatReducer from "./chatReducers";
import roomReducer from "./roomReducers";
export const reducers = combineReducers({
  authReducer,
  postReducer,
  chatReducer,
  roomReducer
});
