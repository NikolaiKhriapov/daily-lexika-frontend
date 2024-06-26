import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FloatingPlusButtonState {
  isExpanded: boolean;
}

const initialState: FloatingPlusButtonState = {
  isExpanded: false,
};

const floatingPlusButtonSlice = createSlice({
  name: 'floatingPlusButtonSlice',
  initialState,
  reducers: {
    setExpanded: (state, action: PayloadAction<boolean>) => {
      state.isExpanded = action.payload;
    },
    toggleExpanded: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { setExpanded, toggleExpanded } = floatingPlusButtonSlice.actions;
export default floatingPlusButtonSlice.reducer;
