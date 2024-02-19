import { apiSlice } from '@store/api/apiSlice';
import authPageSlice from '@store/reducers/authPageSlice';
import floatingChatSlice from '@store/reducers/floatingChatSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  authPageSlice,
  floatingChatSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(apiSlice.middleware),
});

export const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore[`dispatch`];
