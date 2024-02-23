import { LocalStorage } from '@utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const prepareHeaders = (headers: any) => {
  const token = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export const API = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
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
