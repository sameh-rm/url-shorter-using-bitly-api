import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userActionTypes from "./user.actionTypes";

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
    case userActionTypes.LOGOUT:
      return {};
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

export const shortenApiReducer = (
  state = {
    from_url: undefined,
  },
  action
) => {
  switch (action.type) {
    case userActionTypes.USER_SHORTEN_API_REQUEST:
      return {
        loading: true,
      };
    case userActionTypes.USER_SHORTEN_API_SUCCESS:
      return {
        loading: false,
        from_url: action.payload.from_url,
      };
    case userActionTypes.USER_SHORTEN_API_FAILED:
      return {
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export const linksListReducer = (state = { links: [] }, action) => {
  switch (action.type) {
    case userActionTypes.USER_LINKS_LIST_REQUEST:
      return {
        loading: true,
      };
    case userActionTypes.USER_LINKS_LIST_SUCCESS:
      return {
        loading: false,
        links: action.payload,
      };
    case userActionTypes.USER_LINKS_LIST_FAILED:
      return {
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["login"],
};
const userReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  userShortenApi: shortenApiReducer,
  links: linksListReducer,
});

export default persistReducer(persistConfig, userReducer);
