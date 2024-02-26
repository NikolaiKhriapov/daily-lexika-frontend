import { API } from '@store/api/API';
import { ApiEndpointsStatistics } from '@utils/apiMethods';
import { QueryMethods } from '@utils/constants';
import { StatisticsDto } from '@utils/types';

export const statisticsAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query<StatisticsDto, void>({
      query: () => ({
        url: ApiEndpointsStatistics.getStatistics(),
        method: QueryMethods.GET,
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
