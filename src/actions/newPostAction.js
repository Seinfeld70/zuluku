import { NEW_POST_FAIL, NEW_POST_SUCCESS } from "./actionTypes";
import axios from "../axios";

export const startNewPost = data => {
  return async dispatch => {
    try {
      await axios.post("posts.json", data);
      dispatch(newPostSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(newPostFail(err));
    }
  };
};

export const newPostFail = error => {
  return {
    type: NEW_POST_FAIL,
    payload: error
  };
};

export const newPostSuccess = data => {
  return {
    type: NEW_POST_SUCCESS,
    payload: data
  };
};
