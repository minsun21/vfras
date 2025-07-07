import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // ✅ sessionStorage 사용

import authReducer from "./features/authSlice";
import breadcrumbReducer from "./features/breadcrumbSlice";
import passwordReducer from "./features/passwordSlice";
import didPersonalReducer from "./features/didConfigSlice";
import didAddReducer from "./features/didAddSlice";
import loadingReducer from "./features/loadingSlice";

// auth만 persist
const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage: storageSession,
    },
    authReducer
  ),
  breadcrumb: breadcrumbReducer,
  changePassword: passwordReducer,
  didConfig: didPersonalReducer,
  didAdd: didAddReducer,
  loading: loadingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
