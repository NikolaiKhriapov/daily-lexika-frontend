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
