import userActionTypes from "./user.actionTypes";
import axios from "axios";
export const requestAction = (actionType) => ({
  type: actionType,
});

export const successAction = (actionType, payload) => {
  return {
    type: actionType,
    payload: payload,
  };
};

export const failedAction = (actionType, payload) => ({
  type: actionType,
  payload: payload.message,
});

export const logout = () => ({
  type: userActionTypes.LOGOUT,
});

export const register =
  (username, password, email, name) => async (dispatch, getState) => {
    try {
      dispatch(requestAction(userActionTypes.USER_REGISTER_REQUEST));
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://ec2-18-188-125-35.us-east-2.compute.amazonaws.com/api/users/",
        {
          username,
          password,
          email,
          name,
        },
        config
      );
      dispatch(successAction(userActionTypes.USER_REGISTER_SUCCESS, data));
      dispatch(login(username, password));
    } catch (error) {
      dispatch(failedAction(userActionTypes.USER_REGISTER_FAILED, error));
    }
  };

export const login = (username, password) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(userActionTypes.USER_LOGIN_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://ec2-18-188-125-35.us-east-2.compute.amazonaws.com/api/users/login",
      {
        username,
        password,
      },
      config
    );
    dispatch(successAction(userActionTypes.USER_LOGIN_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(userActionTypes.USER_LOGIN_FAILED, error));
  }
};

export const shortenUserLink = (link, api) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(userActionTypes.USER_SHORTEN_API_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getState().user.login.userInfo.token}`,
      },
    };
    console.log(getState().user.login.userInfo.token);
    const { data } = await axios.post(
      `http://ec2-18-188-125-35.us-east-2.compute.amazonaws.com/api/users/urls/${api}`,
      {
        to_url: link,
      },
      config
    );
    dispatch(successAction(userActionTypes.USER_SHORTEN_API_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(userActionTypes.USER_SHORTEN_API_FAILED, error));
  }
};

export const listUserLinks = () => async (dispatch, getState) => {
  try {
    dispatch(requestAction(userActionTypes.USER_LINKS_LIST_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: getState().user.login.userInfo.token,
      },
    };
    const { data } = await axios.get(
      `http://ec2-18-188-125-35.us-east-2.compute.amazonaws.com/api/users/urls`,

      config
    );
    dispatch(successAction(userActionTypes.USER_LINKS_LIST_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(userActionTypes.USER_LINKS_LIST_FAILED, error));
  }
};
