import { baseQuery, prepareHeaders } from '@library/shared/utils';
import { createApi } from '@reduxjs/toolkit/query/react';

export const API = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/api/v1`,
    prepareHeaders,
  }),
  tagTypes: [
    'User',
    'DailyLexikaUsers',
    'DailyLexikaLogs',
  ],
  endpoints: () => ({}),
});
