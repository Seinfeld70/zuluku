import {
  FETCH_POSTS_LOADING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL
} from "./actionTypes";

import axios from "axios";

export const fetchPosts = () => {
  return async dispatch => {
    dispatch(fetchStart(true));
    try {
      const posts = await axios.get(
        "https://sosho-74fef.firebaseio.com/posts.json"
      );
      dispatch(fetchPostsSuccess(posts.data));
    } catch (err) {
      // const error = {
      //   data: err.response.data,
      //   status: err.response.status,
      //   statusText: err.response.statusText
      // };
      console.log(err);
      dispatch(fetchPostsFail(err));
    }
    dispatch(fetchStart(false));
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

export const fetchStart = value => {
  return {
    type: FETCH_POSTS_LOADING,
    payload: value
  };
};
