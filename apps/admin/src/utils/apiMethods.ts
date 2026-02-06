const URL_AUTH = `/auth`;
export const ApiEndpointsAuthorization = {
  register: () => `${URL_AUTH}/register`,
  login: () => `${URL_AUTH}/login`,
};

const URL_USER = `/users`;
export const ApiEndpointsUser = {
  getUser: () => `${URL_USER}/info`,
};

const URL_DAILY_LEXIKA_USER = `/daily-lexika/users`;
export const ApiEndpointsDailyLexikaUser = {
  getAllUsers: () => `${URL_DAILY_LEXIKA_USER}?page={0}&size={1}`,
};

const URL_DAILY_LEXIKA_LOG = `/daily-lexika/logs`;
export const ApiEndpointsDailyLexikaLog = {
  getAllLogs: () => `${URL_DAILY_LEXIKA_LOG}?page={0}&size={1}`,
};

const URL_DAILY_LEXIKA_WORD_DATA = `/daily-lexika/word-data`;
export const ApiEndpointsDailyLexikaWordData = {
  getAllWordData: () => `${URL_DAILY_LEXIKA_WORD_DATA}?platform={0}&page={1}&size={2}`,
  getWordDataById: (id: number) => `${URL_DAILY_LEXIKA_WORD_DATA}/${id}`,
  createWordData: () => `${URL_DAILY_LEXIKA_WORD_DATA}`,
  updateWordData: (id: number) => `${URL_DAILY_LEXIKA_WORD_DATA}/${id}`,
  deleteWordData: (id: number) => `${URL_DAILY_LEXIKA_WORD_DATA}/${id}`,
};

const URL_DAILY_LEXIKA_WORD_PACKS = `/daily-lexika/word-packs`;
export const ApiEndpointsDailyLexikaWordPacks = {
  getAllWordPacks: () => `${URL_DAILY_LEXIKA_WORD_PACKS}?platform={0}&page={1}&size={2}`,
  getWordPackById: (wordPackId: number) => `${URL_DAILY_LEXIKA_WORD_PACKS}/${wordPackId}`,
  createWordPack: () => `${URL_DAILY_LEXIKA_WORD_PACKS}`,
  updateWordPack: (wordPackId: number) => `${URL_DAILY_LEXIKA_WORD_PACKS}/${wordPackId}`,
  deleteWordPack: (wordPackId: number) => `${URL_DAILY_LEXIKA_WORD_PACKS}/${wordPackId}`,
};
