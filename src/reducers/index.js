import { combineReducers } from "redux";

import { postsReducers } from "./postsReducers";
import usersReducers from "./usersReducers";
import currentUser from "./currentUserReducer";

export default combineReducers({
  posts: postsReducers,
  currentUser: currentUser,
  users: usersReducers
});
