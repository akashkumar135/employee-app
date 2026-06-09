import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { logger } from "redux-logger";
import rootReducer from "./rootReducer";

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(logger)),
);

export type StoreState = ReturnType<typeof store.getState>;

export default store;
