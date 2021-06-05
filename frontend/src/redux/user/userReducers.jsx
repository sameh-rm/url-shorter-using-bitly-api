import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userActionTypes from "./user.actionTypes";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["lgoin"],
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case userActionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case userActionTypes.USER_LOGIN_FAILED:
      return {
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case userActionTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case userActionTypes.USER_REGISTER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const bitlyReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_BITLY_API_REQUEST:
      return {
        loading: true,
      };
    case userActionTypes.USER_BITLY_API_SUCCESS:
      return {
        loading: false,
        link: action.payload,
      };
    case userActionTypes.USER_BITLY_API_FAILED:
      return {
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export const localReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOCAL_API_REQUEST:
      return {
        loading: true,
      };
    case userActionTypes.USER_LOCAL_API_SUCCESS:
      return {
        loading: false,
        link: action.payload,
      };
    case userActionTypes.USER_LOCAL_API_FAILED:
      return {
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export const linksListReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOCAL_API_REQUEST:
      return {
        loading: true,
      };
    case userActionTypes.USER_LOCAL_API_SUCCESS:
      return {
        loading: false,
        link: action.payload,
      };
    case userActionTypes.USER_LOCAL_API_FAILED:
      return {
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};
const userReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  bitly: bitlyReducer,
  local: localReducer,
  links: linksListReducer,
});

export default persistReducer(persistConfig, userReducer);
