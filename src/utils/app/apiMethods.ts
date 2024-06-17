import { Status } from '@utils/types';

export const BASE_URL = `${process.env.NEXT_PUBLIC_URL as string}/api/v1`;

const URL_AUTH = `${BASE_URL}/auth`;
export const ApiEndpointsAuthorization = {
  register: () => `${URL_AUTH}/register`,
  login: () => `${URL_AUTH}/login`,
};

const URL_NOTIFICATIONS = `${BASE_URL}/notifications`;
export const ApiEndpointsNotifications = {
  getAllNotifications: () => `${URL_NOTIFICATIONS}`,
  readNotification: (notificationId: number) => `${URL_NOTIFICATIONS}/read/${notificationId}`,
};

const URL_REVIEWS = `${BASE_URL}/flashcards/reviews`;
export const ApiEndpointsReviews = {
  getAllReviews: () => `${URL_REVIEWS}`,
  createReview: () => `${URL_REVIEWS}`,
  updateReview: (reviewId: number) => `${URL_REVIEWS}/${reviewId}`,
  refreshReview: (reviewId: number) => `${URL_REVIEWS}/refresh/${reviewId}`,
  deleteReview: (reviewId: number) => `${URL_REVIEWS}/${reviewId}`,
  processReviewAction: (reviewId: number, answer: boolean | null = null) => `${URL_REVIEWS}/${reviewId}/action${answer !== null ? `?answer=${answer}` : ''}`,
};

const URL_USERS = `${BASE_URL}/user`;
export const ApiEndpointsUsers = {
  getUserInfo: () => `${URL_USERS}/info`,
  updateUserInfo: () => `${URL_USERS}/info`,
  updatePassword: () => `${URL_USERS}/password`,
  deleteAccount: () => `${URL_USERS}`,
};

const URL_STATISTICS = `${BASE_URL}/statistics`;
export const ApiEndpointsStatistics = {
  getStatistics: () => `${URL_STATISTICS}`,
};

const URL_WORD_PACKS = `${BASE_URL}/flashcards/word-packs`;
export const ApiEndpointsWordPacks = {
  getAllWordPacks: () => `${URL_WORD_PACKS}`,
  getPageOfWordsForWordPack: (wordPackName: string, page: number, size: number) => `${URL_WORD_PACKS}/${wordPackName}/words?page=${page}&size=${size}`,
  createCustomWordPack: () => `${URL_WORD_PACKS}`,
  deleteCustomWordPack: (wordPackName: string) => `${URL_WORD_PACKS}/${wordPackName}`,
  addWordToCustomWordPack: (wordPackName: string, wordId: number) => `${URL_WORD_PACKS}/${wordPackName}/add-word/${wordId}`,
  addAllWordsFromWordPackToCustomWordPack: (wordPackNameTo: string, wordPackNameFrom: string) => `${URL_WORD_PACKS}/${wordPackNameTo}/add-words-from-wordpack/${wordPackNameFrom}`,
  removeWordFromCustomWordPack: (wordPackName: string, wordId: number) => `${URL_WORD_PACKS}/${wordPackName}/remove-word/${wordId}`,
};

const URL_WORDS = `${BASE_URL}/flashcards/words`;
export const ApiEndpointsWords = {
  getPageOfWordsByStatus: (status: Status, page: number, size: number) => `${URL_WORDS}/status/${status}?page=${page}&size=${size}`,
  getWordOfTheDay: () => `${URL_WORDS}/word-of-the-day`,
  getWordByWordDataId: (wordDataId: number) => `${URL_WORDS}/by-word-data/${wordDataId}`,
};

const URL_WORD_DATA = `${BASE_URL}/flashcards/word-data`;
export const ApiEndpointsWordData = {
  getAllWordData: () => `${URL_WORD_DATA}`,
};
