import { API } from '@daily-lexika/store/api/API';
import { ApiEndpointsStatistics } from '@daily-lexika/utils/apiMethods';
import { StatisticsDto } from '@library/daily-lexika';
import { QueryMethod } from '@library/shared/utils';

export const statisticsAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query<StatisticsDto, void>({
      query: () => ({
        url: ApiEndpointsStatistics.getStatistics(),
        method: QueryMethod.GET,
      }),
      transformResponse: (response: StatisticsDto) => {
        response.listOfReviewStatisticsDto
          .sort((a, b) => a.wordPackName.localeCompare(b.wordPackName));
        return response;
      },
      providesTags: ['Statistics'],
    }),
  }),
});

export const {
  useGetStatisticsQuery,
} = statisticsAPI;
