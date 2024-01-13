import axios from 'axios';
import { ApiEndpointsReviews } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { ReviewDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const getAllReviews = async () => {
  try {
    return await axios.get(ApiEndpointsReviews.getAllReviews(), getAuthConfig());
  } catch (error) {
    console.error(error);
  }
};

export const getReview = async (reviewId: number) => {
  try {
    return await axios.get(ApiEndpointsReviews.getReview(reviewId), getAuthConfig());
  } catch (error) {
    console.error(error);
  }
};

export const createReview = async (reviewDTO: ReviewDTO) => {
  try {
    return await axios.post(ApiEndpointsReviews.createReview(), reviewDTO, getAuthConfig());
  } catch (error) {
    console.error(error);
  }
};

export const refreshReview = async (reviewId: number) => {
  try {
    return await axios.patch(ApiEndpointsReviews.refreshReview(reviewId), '', getAuthConfig());
  } catch (error) {
    console.error(error);
  }
};

export const removeReview = async (reviewId: number) => {
  try {
    return await axios.delete(ApiEndpointsReviews.removeReview(reviewId), getAuthConfig());
  } catch (error) {
    console.error(error);
  }
};

export const processReviewAction = async (reviewId: number, answer: boolean | null = null) => {
  try {
    return await axios.get(ApiEndpointsReviews.processReviewAction(reviewId, answer), getAuthConfig());
  } catch (error) {
    console.error(error);
  }
};
