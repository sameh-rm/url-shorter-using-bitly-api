import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const initialState = {};

const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
const persistedStore = { store, persistor };

export default persistedStore;
