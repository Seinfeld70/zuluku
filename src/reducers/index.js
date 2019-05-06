import { combineReducers } from "redux";

import { postsReducers } from "./postsReducers";

export default combineReducers({
  posts: postsReducers,
  currentUser: () => {
    return {
      name: "Zullu Balti",
      userName: "zulluBalti",
      userId: "1a",
      avatar: "https://source.unsplash.com/random/50x50"
    };
  }
});
