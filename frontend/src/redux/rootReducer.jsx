import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shortyReducers from "./shorty/shortyReducers";

import userReducer from "./user/userReducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};

const rootReducer = combineReducers({
  user: userReducer,
  shorty: shortyReducers,
});

export default persistReducer(persistConfig, rootReducer);
