import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewsPageTransitionState {
  slideUp: boolean;
  slideDown: boolean;
}

const initialState: ReviewsPageTransitionState = {
  slideUp: false,
  slideDown: false,
};

const reviewsPageTransitionSlice = createSlice({
  name: 'reviewsPageTransitionSlice',
  initialState,
  reducers: {
    setSlideUp: (state, action: PayloadAction<boolean>) => {
      state.slideUp = action.payload;
    },
    setSlideDown: (state, action: PayloadAction<boolean>) => {
      state.slideDown = action.payload;
    },
  },
});

export const { setSlideUp, setSlideDown } = reviewsPageTransitionSlice.actions;
export default reviewsPageTransitionSlice.reducer;
