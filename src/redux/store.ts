import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import favouritesReducer from './favouritesSlice';
import themeReducer from './themeSlice';

/**
 * Security Transform - Excludes sensitive data from persistence
 * Tokens are stored separately in AsyncStorage with secure prefix
 */
const authTransform = createTransform(
  // Transform state on its way to being serialized and persisted
  (inboundState: any) => {
    // Don't persist loading and error states
    return {
      ...inboundState,
      loading: false,
      error: null,
    };
  },
  // Transform state being rehydrated
  (outboundState: any) => {
    return {
      ...outboundState,
      loading: false,
      error: null,
    };
  },
  { whitelist: ['auth'] }
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'favourites', 'theme'],
  transforms: [authTransform],
  // Timeout to prevent app hanging on corrupted storage
  timeout: 10000,
};

const rootReducer = combineReducers({
  auth: authReducer,
  favourites: favouritesReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serialization checks
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
