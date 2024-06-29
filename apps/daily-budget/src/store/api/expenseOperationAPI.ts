import { API } from '@daily-budget/store/api/API';
import { ApiEndpointsExpenseOperations } from '@daily-budget/utils/apiMethods';
import { ExpenseOperationDto } from '@library/daily-budget';
import { QueryMethod } from '@library/shared/utils';

export const expenseOperationAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpenseOperationsByAccountId: builder.query<ExpenseOperationDto[], number>({
      query: (accountId) => ({
        url: ApiEndpointsExpenseOperations.getAllExpenseOperationsByAccountId(accountId),
        method: QueryMethod.GET,
      }),
      providesTags: ['ExpenseOperations'],
    }),
    createExpenseOperation: builder.mutation<void, ExpenseOperationDto>({
      query: (expenseOperationDto: ExpenseOperationDto) => ({
        url: ApiEndpointsExpenseOperations.createExpenseOperation(),
        method: QueryMethod.POST,
        body: expenseOperationDto,
      }),
      invalidatesTags: ['ExpenseOperations'],
    }),
  }),
});

export const {
  useGetAllExpenseOperationsByAccountIdQuery,
  useCreateExpenseOperationMutation,
} = expenseOperationAPI;
