import { API } from '@admin/store/api/API';
import { ApiEndpointsDailyLexikaLog } from '@admin/utils/apiMethods';
import { LogDto } from '@library/daily-lexika';
import { PageResponse, Sort } from '@library/shared/utils';

export const dailyLexikaLogAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getPageOfLogs: builder.query<PageResponse<LogDto>, { page: number; size: number; sort?: Sort }>({
      query: ({ page, size, sort }) => {
        let url = ApiEndpointsDailyLexikaLog.getAllLogs()
          .replace('{0}', page.toString())
          .replace('{1}', size.toString());
        if (sort) {
          url = url.concat(`&sort=${sort}`);
        }
        return url;
      },
      providesTags: ['DailyLexikaLogs'],
    }),
  }),
});

export const {
  useGetPageOfLogsQuery,
} = dailyLexikaLogAPI;
