import { createSlice } from '@reduxjs/toolkit';

interface FloatingChatState {
  isVisible: boolean;
}

const initialState: FloatingChatState = {
  isVisible: false,
};

const floatingChatSlice = createSlice({
  name: 'floatingChatSlice',
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleVisibility } = floatingChatSlice.actions;
export default floatingChatSlice.reducer;
