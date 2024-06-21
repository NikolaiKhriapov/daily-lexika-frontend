import { API } from '@admin/store/api/API';
import { ApiEndpointsDailyLexikaUser } from '@admin/utils/apiMethods';
import { UserDto } from '@library/daily-lexika';
import { PageResponse, Sort } from '@library/shared/utils';

export const dailyLexikaUserAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getPageOfUsers: builder.query<PageResponse<UserDto>, { page: number; size: number; sort?: Sort }>({
      query: ({ page, size, sort }) => {
        let url = ApiEndpointsDailyLexikaUser.getAllUsers()
          .replace('{0}', page.toString())
          .replace('{1}', size.toString());
        if (sort) {
          url = url.concat(`&sort=${sort}`);
        }
        return url;
      },
      providesTags: ['DailyLexikaUsers'],
    }),
  }),
});

export const {
  useGetPageOfUsersQuery,
} = dailyLexikaUserAPI;
