import { AuthFormType } from '@utils/constants';
import { createSlice } from '@reduxjs/toolkit';

interface AuthPageState {
  authFormType: AuthFormType;
}

const initialState: AuthPageState = {
  authFormType: AuthFormType.LOGIN,
};

const authPageSlice = createSlice({
  name: 'authPageSlice',
  initialState,
  reducers: {
    toggleAuthFormType: (state) => {
      state.authFormType = state.authFormType === AuthFormType.LOGIN ? AuthFormType.REGISTER : AuthFormType.LOGIN;
    },
  },
});

export const { toggleAuthFormType } = authPageSlice.actions;
export default authPageSlice.reducer;
