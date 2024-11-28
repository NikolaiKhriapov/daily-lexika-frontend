const URL_AUTH = `/auth`;
export const ApiEndpointsAuthorization = {
  register: () => `${URL_AUTH}/register`,
  login: () => `${URL_AUTH}/login`,
};

const URL_USERS = `/users`;
export const ApiEndpointsUsers = {
  getUser: () => `${URL_USERS}/info`,
  updateUserInfo: () => `${URL_USERS}/info`,
  updatePassword: () => `${URL_USERS}/password`,
  deleteAccount: () => `${URL_USERS}`,
};

const URL_ACCOUNTS = `/accounts`;
export const ApiEndpointsAccounts = {
  getAllAccounts: () => `${URL_ACCOUNTS}`,
  createAccount: () => `${URL_ACCOUNTS}`,
  updateAccount: (accountId: number) => `${URL_ACCOUNTS}/${accountId}`,
};

const URL_EXPENSE_OPERATIONS = `/expense-operations`;
export const ApiEndpointsExpenseOperations = {
  getAllExpenseOperationsByAccountId: (accountId: number) => `${URL_EXPENSE_OPERATIONS}/by-account/${accountId}`,
  createExpenseOperation: () => `${URL_EXPENSE_OPERATIONS}`,
};
