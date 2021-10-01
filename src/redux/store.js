import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

const middlewares = [logger];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

const persistedStore = { store, persistor };

export default persistedStore;
