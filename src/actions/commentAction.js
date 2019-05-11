import {
  NEW_COMMENT_FAIL,
  NEW_COMMENT_SUCCESS,
  DELETE_COMMENT
} from "./actionTypes";
import axios from "../axios";

export const newComment = (data, postId) => {
  return async dispatch => {
    try {
      var newCom = await axios.post(`posts/${postId}/comments.json`, data);
      dispatch(newCommentSuccess({ id: newCom.data.name, ...data }, postId));
    } catch (err) {
      console.log(err);
      dispatch(newCommentFail(err));
    }
    return newCom.data.name;
  };
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

export const deleteComment = (postId, commentId, userId) => {
  return async dispatch => {
    try {
      await axios.delete(`posts/${postId}/comments/${commentId}.json`);
      dispatch(deleteCommentSuccessful(postId, commentId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteCommentSuccessful = (postId, commentId) => {
  return {
    type: DELETE_COMMENT,
    payload: {
      postId,
      commentId
    }
  };
};
