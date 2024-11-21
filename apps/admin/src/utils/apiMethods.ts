// export const BASE_URL = `${process.env.NEXT_PUBLIC_URL as string}/api/v1`;
export const BASE_URL = '';

const URL_AUTH = `${BASE_URL}/auth`;
export const ApiEndpointsAuthorization = {
  register: () => `${URL_AUTH}/register`,
  login: () => `${URL_AUTH}/login`,
};

const URL_USER = `${BASE_URL}/users`;
export const ApiEndpointsUser = {
  getUser: () => `${URL_USER}/info`,
};

const URL_DAILY_LEXIKA_USER = `${BASE_URL}/daily-lexika/users`;
export const ApiEndpointsDailyLexikaUser = {
  getAllUsers: () => `${URL_DAILY_LEXIKA_USER}?page={0}&size={1}`,
};

const URL_DAILY_LEXIKA_LOG = `${BASE_URL}/daily-lexika/logs`;
export const ApiEndpointsDailyLexikaLog = {
  getAllLogs: () => `${URL_DAILY_LEXIKA_LOG}?page={0}&size={1}`,
};
