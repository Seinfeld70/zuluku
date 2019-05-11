import {
  FETCH_POSTS_LOADING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  DELETE_POST
} from "./actionTypes";

import axios from "../axios";

export const fetchPosts = () => {
  return async dispatch => {
    dispatch(fetchPostsLoading(true));
    try {
      const posts = await axios.get("posts.json");
      dispatch(fetchPostsSuccess(posts.data));
    } catch (err) {
      console.log(err);
      dispatch(fetchPostsFail(err));
    }
    dispatch(fetchPostsLoading(false));
  };
};

export const fetchPostsSuccess = data => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: data
  };
};

export const fetchPostsFail = err => {
  return {
    type: FETCH_POSTS_FAIL,
    payload: err
  };
};

export const fetchPostsLoading = value => {
  return {
    type: FETCH_POSTS_LOADING,
    payload: value
  };
};

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/posts/${id}.json`);
    dispatch(deletePostSuccess(id));
  } catch (err) {
    console.log(err);
  }
};

export const deletePostSuccess = id => ({
  type: DELETE_POST,
  payload: id
});
