const BASE_URL = process.env.NEXT_PUBLIC_URL as string + "/api/v1";

const URL_AUTH = `${BASE_URL}/auth`;
export const ApiEndpointsAuthorization = {
  register: `${URL_AUTH}/register`,
  login: `${URL_AUTH}/login`,
};

const URL_NOTIFICATIONS = `${BASE_URL}/notifications`;
export const ApiEndpointsNotifications = {
  getAllNotifications: () => `${URL_NOTIFICATIONS}`,
  readNotification: (notificationId: number) => `${URL_NOTIFICATIONS}/read/${notificationId}`,
};

const URL_REVIEWS = `${BASE_URL}/flashcards/reviews`;
export const ApiEndpointsReviews = {
  getAllReviews: () => `${URL_REVIEWS}`,
  getReview: (reviewId: number) => `${URL_REVIEWS}/${reviewId}`,
  createReview: () => `${URL_REVIEWS}`,
  refreshReview: (reviewId: number) => `${URL_REVIEWS}/${reviewId}`,
  deleteReview: (reviewId: number) => `${URL_REVIEWS}/${reviewId}`,
  processReviewAction: (reviewId: number, answer: boolean | null = null) => `${URL_REVIEWS}/${reviewId}/action${answer !== null ? `?answer=${answer}` : ''}`,
};

const URL_USERS = `${BASE_URL}/user`;
export const ApiEndpointsUsers = {
  updateUserInfo: () => `${URL_USERS}/account/info`,
  deleteAccount: () => `${URL_USERS}/account`,
};

const URL_STATISTICS = `${BASE_URL}/statistics`;
export const ApiEndpointsStatistics = {
  getStatistics: () => `${URL_STATISTICS}`,
};

const URL_WORD_PACKS = `${BASE_URL}/flashcards/word-packs`;
export const ApiEndpointsWordPacks = {
  getAllWordPacks: () => `${URL_WORD_PACKS}`,
  getWordPack: (wordPackName: string) => `${URL_WORD_PACKS}/${wordPackName}`,
  getAllWordsForWordPack: (wordPackName: string, page: number, size: number) => `${URL_WORD_PACKS}/${wordPackName}/words?page=${page}&size=${size}`,
};
