import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shortyActionTypes from "./shorty.actionTypes";

export const shortenApiReducer = (
  state = {
    from_url: undefined,
  },
  action
) => {
  switch (action.type) {
    case shortyActionTypes.SHORTEN_API_REQUEST:
      return {
        loading: true,
      };
    case shortyActionTypes.SHORTEN_API_SUCCESS:
      return {
        loading: false,
        from_url: action.payload.from_url,
      };
    case shortyActionTypes.SHORTEN_API_FAILED:
      return {
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "shorty",
  storage,
  whitelist: [""],
};
const shortyReducer = combineReducers({
  shortenApi: shortenApiReducer,
});

export default persistReducer(persistConfig, shortyReducer);
