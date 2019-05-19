export { fetchPosts, deletePost } from "./postsActions";
export { startNewPost } from "./newPostAction";
export { newComment, deleteComment } from "./commentAction";
export { addLike, removeLike, addDislike, removeDislike } from "./likeAction";

// Users

export {
  fetchUsers,
  userLogOut,
  authUser,
  checkUserLogin
} from "./usersActions";
