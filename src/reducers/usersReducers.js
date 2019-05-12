import {
  FETCH_USERS_LOADING,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null
};
const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_LOADING:
      return { ...state, loading: action.payload };
    case FETCH_USERS_FAIL:
      return { ...state, error: action.payload };
    case FETCH_USERS_SUCCESS:
      return { ...state, users: [...action.payload] };
    default:
      return state;
  }
};

export default usersReducers;
