import WordDataHelper from '@daily-lexika/helpers/WordDataHelper';
import { API } from '@daily-lexika/store/api/API';
import { ApiEndpointsWordData } from '@daily-lexika/utils/apiMethods';
import { WordDataDto } from '@library/daily-lexika';
import { QueryMethod } from '@library/shared/utils';

export const wordDataAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllWordData: builder.query<WordDataDto[], void>({
      query: () => ({
        url: ApiEndpointsWordData.getAllWordData(),
        method: QueryMethod.GET,
      }),
      transformResponse: (response: WordDataDto[]) => response.sort(WordDataHelper.sortWordDataChineseByTranscription),
    }),
  }),
});

export const {
  useGetAllWordDataQuery,
} = wordDataAPI;
