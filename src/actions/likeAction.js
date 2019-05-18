import axios from "../axios";
import {
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_DISLIKE,
  REMOVE_DISLIKE
} from "./actionTypes";

export const finished = (postId, data, type) => {
  return {
    type,
    payload: {
      data,
      postId
    }
  };
};
export const addLike = (postId, userId) => {
  return async dispatch => {
    try {
      const newData = {};
      const data = await axios.post(
        `posts/${postId}/likes.json`,
        // eslint-disable-next-line
        new Object(userId)
      );
      newData[data.data.name] = userId;
      dispatch(finished(postId, newData, ADD_LIKE));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeLike = (postId, likeId) => {
  return async dispatch => {
    try {
      await axios.delete(`posts/${postId}/likes.json`, likeId);
      dispatch(finished(postId, likeId, REMOVE_LIKE));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addDislike = (postId, userId) => {
  return async dispatch => {
    try {
      const newData = {};
      const data = await axios.post(
        `posts/${postId}/dislikes.json`,
        // eslint-disable-next-line
        new Object(userId)
      );
      newData[data.data.name] = userId;
      dispatch(finished(postId, newData, ADD_DISLIKE));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeDislike = (postId, dislikeId) => {
  return async dispatch => {
    try {
      await axios.delete(`posts/${postId}/dislikes.json`, dislikeId);
      dispatch(finished(postId, dislikeId, REMOVE_DISLIKE));
    } catch (err) {
      console.log(err);
    }
  };
};
