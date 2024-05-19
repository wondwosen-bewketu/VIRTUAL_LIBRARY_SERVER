// reducers.js

import { combineReducers } from "redux";
import userReducer from "./slice/userSlice"; // Add userReducer

const rootReducer = combineReducers({
  user: userReducer, // Add user reducer

  // Add other reducers here if needed
});

export default rootReducer;
