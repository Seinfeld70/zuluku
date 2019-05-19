import myAxios from "../axios";
import {
  FETCH_USERS_LOADING,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  USER_LOG_OUT,
  AUTH_USER,
  AUTH_USER_LOADING,
  AUTH_USER_FAIL,
  CHECK_LOG_IN
} from "./actionTypes";
import axios from "axios";

export const fetchUsers = () => {
  return async dispatch => {
    dispatch(fetchUsersLoading(true));
    try {
      const data = await myAxios.get("/users.json");
      const users = [];
      for (let keys in data.data) users.push(data.data[keys]);
      dispatch(fetchUsersSuccess(users));
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

export const userLogOut = () => {
  return {
    type: USER_LOG_OUT
  };
};

export const authSuccess = authData => {
  for (let keys in authData) localStorage.setItem(keys, authData[keys]);
  return {
    type: AUTH_USER,
    payload: authData
  };
};
export const authUserLoading = val => {
  return {
    type: AUTH_USER_LOADING,
    payload: val
  };
};
export const authUserFail = error => {
  return {
    type: AUTH_USER_FAIL,
    payload: error
  };
};

export const authUser = () => {
  return async dispatch => {
    try {
      let clientId =
        "768166891189-59aoqa4qmq6gnhq42mrh13klmo1k0m43.apps.googleusercontent.com";
      // const clientSecretId = "VA__A8qWFUduy3i0PNZIA0My";

      window.gapi.load("client: auth2", async () => {
        console.log("after cient: ", window.gapi);
        await window.gapi.client.init({ clientId, scope: "email profile" });
        console.log("afer scope: ", window.gapi);
        const auth = window.gapi.auth2.getAuthInstance();
        console.log(auth);
        const userData = await auth.signIn();
        console.log("useData: ", userData);
        clientId = userData.Zi.id_token;

        const authData = {
          // develpment requestUri: "http://localhost",
          requestUri: "https://sosho-74fef.firebaseapp.com/", // deployment
          postBody: `id_token=${clientId}&providerId=google.com`,
          returnIdpCredential: true,
          returnSecureToken: true
        };

        const data = await axios.post(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyAssertion?key=AIzaSyBzlrx_pc36oaun89WWS9pRsJy9_98I-L0",
          authData
        );
        console.log(data);
        const postUserData = {
          email: data.data.email,
          firstName: data.data.firstName,
          fullName: data.data.fullName,
          photoUrl: data.data.photoUrl,
          localId: data.data.localId
        };
        const users = await myAxios.get("/users.json");
        console.log(users.data);
        let hasUserAlready = false;
        for (let keys in users.data) {
          if (users.data[keys].localId === postUserData.localId)
            hasUserAlready = true;
        }
        if (!hasUserAlready) myAxios.post("/users.json", postUserData);
        dispatch(authSuccess(postUserData));
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const checkUserLogin = () => {
  return {
    type: CHECK_LOG_IN
  };
};
