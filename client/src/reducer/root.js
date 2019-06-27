import { combineReducers } from "redux";
import errorsReducer from "../reducer/errors";
import authReducer from "./auth";

const rootReducer = combineReducers({
  errors: errorsReducer,
  auth: authReducer
});

export default rootReducer;
