import {
  USER_LOG_OUT,
  AUTH_USER,
  AUTH_USER_FAIL,
  AUTH_USER_LOADING,
  CHECK_LOG_IN
} from "../actions/actionTypes";

const initialData = {
  userData: {},
  loading: false,
  signIn: false,
  error: null
};
const removeFromLocalStorage = data => {
  for (let keys in data) localStorage.removeItem(keys);
};
const loginChecker = data => {
  const photoUrl = localStorage.getItem("photoUrl");
  const localId = localStorage.getItem("localId");
  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");

  if (photoUrl && localId && fullName && email)
    return {
      ...data,
      userData: { photoUrl, localId, fullName, email },
      signIn: true
    };
  else return { ...data };
};
const currentUser = (state = initialData, action) => {
  switch (action.type) {
    case USER_LOG_OUT:
      removeFromLocalStorage(state.userData);
      return initialData;
    case AUTH_USER:
      return { ...state, userData: action.payload, signIn: true };
    case AUTH_USER_LOADING:
      return { ...state, loading: action.payload };
    case AUTH_USER_FAIL:
      return { ...state, error: action.payload };
    case CHECK_LOG_IN:
      return loginChecker(state);
    default:
      return state;
  }
};

export default currentUser;
