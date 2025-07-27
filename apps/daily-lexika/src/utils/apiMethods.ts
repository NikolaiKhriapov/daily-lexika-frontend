import { Status } from '@library/daily-lexika';

const URL_AUTH = `/auth`;
export const ApiEndpointsAuthorization = {
  register: () => `${URL_AUTH}/register`,
  login: () => `${URL_AUTH}/login`,
};

const URL_NOTIFICATIONS = `/notifications`;
export const ApiEndpointsNotifications = {
  getAllNotifications: () => `${URL_NOTIFICATIONS}`,
  readNotification: (notificationId: number) => `${URL_NOTIFICATIONS}/read/${notificationId}`,
};

const URL_REVIEWS = `/flashcards/reviews`;
export const ApiEndpointsReviews = {
  getAllReviews: () => `${URL_REVIEWS}`,
  createReview: () => `${URL_REVIEWS}`,
  updateReview: (reviewId: number) => `${URL_REVIEWS}/${reviewId}`,
  refreshReview: (reviewId: number) => `${URL_REVIEWS}/refresh/${reviewId}`,
  deleteReview: (reviewId: number) => `${URL_REVIEWS}/${reviewId}`,
  processReviewAction: (reviewId: number, answer: boolean | null = null) => `${URL_REVIEWS}/${reviewId}/action${answer !== null ? `?answer=${answer}` : ''}`,
};

const URL_USERS = `/users`;
export const ApiEndpointsUsers = {
  getUser: () => `${URL_USERS}/info`,
  updateUserInfo: () => `${URL_USERS}/info`,
  updatePassword: () => `${URL_USERS}/password`,
  deleteAccount: () => `${URL_USERS}`,
};

const URL_STATISTICS = `/statistics`;
export const ApiEndpointsStatistics = {
  getStatistics: () => `${URL_STATISTICS}`,
};

const URL_WORD_PACKS = `/flashcards/word-packs`;
export const ApiEndpointsWordPacks = {
  getAllWordPacks: () => `${URL_WORD_PACKS}`,
  createCustomWordPack: () => `${URL_WORD_PACKS}`,
  deleteCustomWordPack: (wordPackName: string) => `${URL_WORD_PACKS}/${wordPackName}`,
};

const URL_WORDS = `/flashcards/words`;
export const ApiEndpointsWords = {
  getPageOfWordsByStatus: (status: Status, page: number, size: number) => `${URL_WORDS}/status/${status}?page=${page}&size=${size}`,
  getPageOfWordsByWordPackName: (wordPackName: string, page: number, size: number) => `${URL_WORDS}/word-pack/${wordPackName}?page=${page}&size=${size}`,
  getWordOfTheDay: () => `${URL_WORDS}/word-of-the-day`,
  getWordByWordDataId: (wordDataId: number) => `${URL_WORDS}/by-word-data/${wordDataId}`,
};

const URL_WORD_DATA = `/flashcards/word-data`;
export const ApiEndpointsWordData = {
  getAllWordData: () => `${URL_WORD_DATA}`,
  addCustomWordPackToWordData: (wordDataId: number, wordPackName: string) => `${wordDataId}/add-word-pack/${wordPackName}`,
  addCustomWordPackToWordDataByWordPackName: (wordPackNameToBeAdded: string, wordPackNameOriginal: string) => `${URL_WORD_DATA}/${wordPackNameOriginal}/add-word-pack-to-word-data/${wordPackNameToBeAdded}`,
  removeCustomWordPackFromWordData: (wordDataId: number, wordPackName: string) => `${URL_WORD_DATA}/${wordDataId}/remove-word-pack/${wordPackName}`,
};
