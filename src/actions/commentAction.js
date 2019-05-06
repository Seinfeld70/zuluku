import {
  NEW_COMMENT_LOADING,
  NEW_COMMENT_FAIL,
  NEW_COMMENT_SUCCESS
} from "./actionTypes";
import axios from "axios";

export const newComment = (data, postId) => {
  return async dispatch => {
    dispatch(newCommentLoading(true));
    try {
      await axios.post(
        `https://sosho-74fef.firebaseio.com/posts/${postId}/comments.json`,
        data
      );
      dispatch(newCommentSuccess(data, postId));
    } catch (err) {
      console.log(err);
      dispatch(newCommentFail(err));
    }
    dispatch(newCommentLoading(false));
  };
};

export const newCommentLoading = val => {
  return { type: NEW_COMMENT_LOADING, payload: val };
};

export const newCommentFail = err => {
  return {
    type: NEW_COMMENT_FAIL,
    payload: err
  };
};

export const newCommentSuccess = (data, postId) => {
  return {
    type: NEW_COMMENT_SUCCESS,
    payload: {
      data,
      postId
    }
  };
};
