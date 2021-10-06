import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

export const store = createStore(rootReducer, devToolsEnhancer());

export const persistor = persistStore(store);

const persistedStore = { store, persistor };

export default persistedStore;
