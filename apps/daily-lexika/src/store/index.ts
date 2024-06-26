import { API } from '@daily-lexika/store/api/API';
import authPageSlice from '@daily-lexika/store/reducers/authPageSlice';
import floatingPlusButtonSlice from '@daily-lexika/store/reducers/floatingPlusButtonSlice';
import reviewsPageTransitionSlice from '@daily-lexika/store/reducers/reviewsPageTransitionSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  authPageSlice,
  reviewsPageTransitionSlice,
  floatingPlusButtonSlice,
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
