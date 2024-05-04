import { combineReducers } from "redux";
import postsReducer from "./postsReducer";

// For Future any new reducers will be added so for that we used combineReducers
const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;
