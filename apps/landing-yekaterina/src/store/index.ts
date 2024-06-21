import floatingChatSlice from '@landing-yekaterina/store/reducers/floatingChatSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  floatingChatSlice,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
});

export const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore[`dispatch`];
