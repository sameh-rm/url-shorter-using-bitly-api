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

export const login = (username, password) => async (dispatch, getState) => {
  // {
  //   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdCIsImV4cCI6MTYyMjkwNjY4MH0.UquxdmXUJSm5wRV81fHg2EZMsh9dxaMGYcSpM9JlTYw",
  //   "username": "test",
  //   "message": "user has been created"
  // }
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
