import { API } from '@store/api/API';
import { ApiEndpointsStatistics } from '@utils/app/apiMethods';
import { QueryMethod } from '@utils/constants';
import { StatisticsDto } from '@utils/types';

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
