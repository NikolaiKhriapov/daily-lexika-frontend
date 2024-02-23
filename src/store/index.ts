import { API } from '@store/api/API';
import authPageSlice from '@store/reducers/authPageSlice';
import floatingChatSlice from '@store/reducers/floatingChatSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  authPageSlice,
  floatingChatSlice,
  [API.reducerPath]: API.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(API.middleware),
});

export const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore[`dispatch`];
