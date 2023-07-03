import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const getAllReviews = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/vocabulary/reviews`,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}

export const createReview = async (review) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/vocabulary/reviews`,
            review,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}

export const deleteReview = async (reviewId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/vocabulary/reviews/${reviewId}`,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}

export const startReview = async (reviewId) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/vocabulary/reviews/${reviewId}/start`,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}

export const nextReview = async (reviewId, answer) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/vocabulary/reviews/${reviewId}/next?answer=${answer}`,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}
