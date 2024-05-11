import { API } from '@store/api/API';
import authPageSlice from '@store/reducers/app/authPageSlice';
import floatingPlusButtonSlice from '@store/reducers/app/floatingPlusButtonSlice';
import reviewsPageTransitionSlice from '@store/reducers/app/reviewsPageTransitionSlice';
import floatingChatSlice from '@store/reducers/landing/floatingChatSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  authPageSlice,
  reviewsPageTransitionSlice,
  floatingPlusButtonSlice,
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
