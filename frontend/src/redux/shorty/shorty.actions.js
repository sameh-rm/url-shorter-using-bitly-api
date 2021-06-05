import shortyActionTypes from "./shorty.actionTypes";
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

export const shortenLink = (link, api) => async (dispatch, getState) => {
  try {
    dispatch(requestAction(shortyActionTypes.SHORTEN_API_REQUEST));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://ec2-18-188-125-35.us-east-2.compute.amazonaws.com/api/${api}/`,
      {
        to_url: link,
      },
      config
    );
    dispatch(successAction(shortyActionTypes.SHORTEN_API_SUCCESS, data));
  } catch (error) {
    dispatch(failedAction(shortyActionTypes.SHORTEN_API_FAILED, error));
  }
};
