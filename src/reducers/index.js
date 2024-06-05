import { combineReducers } from "redux";

import authReducer from "./authReducers"
import postReducer from "./postReducers";
export const reducers =combineReducers({authReducer,postReducer})

