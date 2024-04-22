import { errorNotification } from '@services/app/popup-notification';
import { LocalStorage } from '@utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = (baseQueryOptions: any) => async (args: any, api: any, extraOptions: any) => {
  const result = await fetchBaseQuery(baseQueryOptions)(args, api, extraOptions);

  if (result.error) {
    if (typeof localStorage !== 'undefined') {
      if (result.error.status === 403 && localStorage.getItem(LocalStorage.ACCESS_TOKEN)) {
        localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
    if (result.error.status === 'FETCH_ERROR') {
      errorNotification("Unable to establish a connection", "Please ensure you have an active internet connection and try again.");
    }
    console.log(result.error);
  }

  return result;
};

const prepareHeaders = (headers: any) => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return headers;
};

export const API = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL as string}/api/v1`,
    prepareHeaders,
  }),
  tagTypes: [
    'User',
    'Notifications',
    'Reviews',
    'WordPacks',
    'Statistics',
    'WordData',
    'Words',
    'AllWordsForWordPack',
  ],
  endpoints: () => ({}),
});

export function providesList<R extends any[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T,
) {
  return resultsWithIds
    ? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))]
    : [{ type: tagType, id: 'LIST' }];
}
