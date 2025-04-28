// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import breadcrumbReducer from './features/breadcrumbSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 기본: localStorage

import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // ✅ 유지할 슬라이스만 설정
};

const rootReducer = combineReducers({
  auth: authReducer,
  breadcrumb: breadcrumbReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist 때문에 필요
    }),
});

export const persistor = persistStore(store);
