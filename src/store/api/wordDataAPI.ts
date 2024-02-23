import { API } from '@store/api/API';
import { ApiEndpointsWordData } from '@utils/apiMethods';
import { QueryMethods } from '@utils/constants';
import { sortWordsChinese } from '@utils/functions';
import { WordDataDTO } from '@utils/types';

export const wordDataAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllWordData: builder.query<WordDataDTO[], void>({
      query: () => ({
        url: ApiEndpointsWordData.getAllWordData(),
        method: QueryMethods.GET,
      }),
      transformResponse: (response: WordDataDTO[]) => response.sort(sortWordsChinese),
    }),
  }),
});

export const {
  useGetAllWordDataQuery,
} = wordDataAPI;
