import { combineReducers } from "redux";

import authReducer from "./authReducers";
import postReducer from "./postReducers";
import chatReducer from "./chatReducers";
export const reducers = combineReducers({
  authReducer,
  postReducer,
  chatReducer
});
