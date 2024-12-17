import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import Guidline from './Guideline.js';
import logger from 'redux-logger';
import nomeuser from "./Nomeuser.js";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  viewguidline: Guidline,
  nameuser: nomeuser
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    modalandguide: persistedReducer

  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false }).concat(logger)
});

export const persistor = persistStore(store);
export default store;
