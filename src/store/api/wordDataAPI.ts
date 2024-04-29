import { API } from '@store/api/API';
import { ApiEndpointsWordData } from '@utils/app/apiMethods';
import { QueryMethods } from '@utils/constants';
import { WordDataDto } from '@utils/types';
import WordDataHelper from '@helpers/WordDataHelper';

export const wordDataAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllWordData: builder.query<WordDataDto[], void>({
      query: () => ({
        url: ApiEndpointsWordData.getAllWordData(),
        method: QueryMethods.GET,
      }),
      transformResponse: (response: WordDataDto[]) => response.sort(WordDataHelper.sortWordDataChineseByTranscription),
    }),
  }),
});

export const {
  useGetAllWordDataQuery,
} = wordDataAPI;
