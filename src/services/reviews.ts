import axios, { AxiosResponse } from 'axios';
import { ApiEndpointsReviews } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { ReviewDTO, WordDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const getAllReviews = async (): Promise<AxiosResponse<ReviewDTO[]>> => {
  try {
    return await axios.get(ApiEndpointsReviews.getAllReviews(), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReview = async (reviewId: number): Promise<AxiosResponse<ReviewDTO>> => {
  try {
    return await axios.get(ApiEndpointsReviews.getReview(reviewId), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createReview = async (reviewDTO: ReviewDTO): Promise<AxiosResponse<ReviewDTO>> => {
  try {
    return await axios.post(ApiEndpointsReviews.createReview(), reviewDTO, getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const refreshReview = async (reviewId: number): Promise<AxiosResponse<void>> => {
  try {
    return await axios.patch(ApiEndpointsReviews.refreshReview(reviewId), '', getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReview = async (reviewId: number): Promise<AxiosResponse<void>> => {
  try {
    return await axios.delete(ApiEndpointsReviews.deleteReview(reviewId), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const processReviewAction = async (reviewId: number, answer: boolean | null = null): Promise<AxiosResponse<{ reviewWordDTO: WordDTO; reviewUpdatedSize: number }>> => {
  try {
    return await axios.get(ApiEndpointsReviews.processReviewAction(reviewId, answer), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
