import axios from "../axios";
import {
  FETCH_USERS_LOADING,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS
} from "./actionTypes";

export const fetchUsers = () => {
  return async dispatch => {
    dispatch(fetchUsersLoading(true));
    try {
      const data = await axios.get("/users.json");
      dispatch(fetchUsersSuccess(data.data));
    } catch (err) {
      console.log(err);
      dispatch(fetchUsersFail(err.data));
    }
    dispatch(fetchUsersLoading(false));
  };
};

export const fetchUsersLoading = val => {
  return {
    type: FETCH_USERS_LOADING,
    payload: val
  };
};

export const fetchUsersSuccess = data => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: data
  };
};

export const fetchUsersFail = error => {
  return {
    type: FETCH_USERS_FAIL,
    payload: error
  };
};
