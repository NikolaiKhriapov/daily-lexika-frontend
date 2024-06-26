import { baseQuery, prepareHeaders } from '@library/shared/utils';
import { createApi } from '@reduxjs/toolkit/query/react';

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
    'PageOfWordsByStatus',
    'PageOfWordsForWordPack',
  ],
  endpoints: () => ({}),
});
