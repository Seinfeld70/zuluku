import { combineReducers } from "redux";

import { postsReducers } from "./postsReducers";
import usersReducers from "./usersReducers";

export default combineReducers({
  posts: postsReducers,
  currentUser: () => {
    return {
      name: "Jon Doe",
      userName: "Jon4Doe",
      userId: "2b",
      avatar: "https://source.unsplash.com/random/50x50"
    };
  },
  users: usersReducers
});
