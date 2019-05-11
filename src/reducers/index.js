import { combineReducers } from "redux";

import { postsReducers } from "./postsReducers";

export default combineReducers({
  posts: postsReducers,
  currentUser: () => {
    return {
      name: "Jon Doe",
      userName: "Jon4Doe",
      userId: "2b",
      avatar: "https://source.unsplash.com/random/50x50"
    };
  }
});
