import {
  USER_LOG_OUT,
  AUTH_USER,
  AUTH_USER_FAIL,
  AUTH_USER_LOADING
} from "../actions/actionTypes";

const initialData = {
  userData: {},
  loading: false,
  signIn: false,
  error: null
};

const currentUser = (state = initialData, action) => {
  switch (action.type) {
    case USER_LOG_OUT:
      return initialData;
    case AUTH_USER:
      return { ...state, userData: action.payload, signIn: true };
    case AUTH_USER_LOADING:
      return { ...state, loading: action.payload };
    case AUTH_USER_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default currentUser;
