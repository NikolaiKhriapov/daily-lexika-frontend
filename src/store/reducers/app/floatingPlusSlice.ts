import { createSlice } from '@reduxjs/toolkit';

interface FloatingPlusState {
  isVisible: boolean;
}

const initialState: FloatingPlusState = {
  isVisible: false,
};

const floatingPlusSlice = createSlice({
  name: 'floatingPlusSlice',
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleVisibility } = floatingPlusSlice.actions;
export default floatingPlusSlice.reducer;
