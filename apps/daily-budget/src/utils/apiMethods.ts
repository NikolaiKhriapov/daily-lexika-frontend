export const BASE_URL = `${process.env.NEXT_PUBLIC_URL as string}/api/v1`;

const URL_AUTH = `${BASE_URL}/auth`;
export const ApiEndpointsAuthorization = {
  register: () => `${URL_AUTH}/register`,
  login: () => `${URL_AUTH}/login`,
};

const URL_USERS = `${BASE_URL}/users`;
export const ApiEndpointsUsers = {
  getUser: () => `${URL_USERS}/info`,
  updateUserInfo: () => `${URL_USERS}/info`,
  updatePassword: () => `${URL_USERS}/password`,
  deleteAccount: () => `${URL_USERS}`,
};

const URL_ACCOUNTS = `${BASE_URL}/accounts`;
export const ApiEndpointsAccounts = {
  getAllAccounts: () => `${URL_ACCOUNTS}`,
  createAccount: () => `${URL_ACCOUNTS}`,
  updateAccount: (accountId: number) => `${URL_ACCOUNTS}/${accountId}`,
};

const URL_EXPENSE_OPERATIONS = `${BASE_URL}/expense-operations`;
export const ApiEndpointsExpenseOperations = {
  getAllExpenseOperationsByAccountId: (accountId: number) => `${URL_EXPENSE_OPERATIONS}/by-account/${accountId}`,
  createExpenseOperation: () => `${URL_EXPENSE_OPERATIONS}`,
};
