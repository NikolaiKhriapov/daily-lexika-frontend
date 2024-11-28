import { API } from '@daily-budget/store/api/API';
import { ApiEndpointsAccounts } from '@daily-budget/utils/apiMethods';
import { AccountDto } from '@library/daily-budget';
import { QueryMethod } from '@library/shared/utils';

export const accountAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccounts: builder.query<AccountDto[], void>({
      query: () => ({
        url: ApiEndpointsAccounts.getAllAccounts(),
        method: QueryMethod.GET,
      }),
      providesTags: ['Accounts'],
    }),
    createAccount: builder.mutation<void, AccountDto>({
      query: (accountDto: AccountDto) => ({
        url: ApiEndpointsAccounts.createAccount(),
        method: QueryMethod.POST,
        body: accountDto,
      }),
      invalidatesTags: ['Accounts'],
    }),
    updateAccount: builder.mutation<AccountDto, { accountId: number, accountDto: AccountDto }>({
      query: ({ accountId, accountDto }) => ({
        url: ApiEndpointsAccounts.updateAccount(accountId),
        method: QueryMethod.PATCH,
        body: accountDto,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedAccount } = await queryFulfilled;
          dispatch(accountAPI.util?.updateQueryData('getAllAccounts', undefined, (draft) => {
            const account = draft?.find((item) => item.id === args.accountId);
            if (account) {
              Object.assign(account, updatedAccount);
            }
          }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

  }),
});

export const {
  useGetAllAccountsQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
} = accountAPI;
