import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const showUserAccount = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/account`,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}

export const updateUserInfo = async (userDTO) => {
    try {
        return await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/account/info`,
            userDTO,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}

export const deleteAccount = async () => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/account`,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}

export const getUserStatistics = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/statistics`,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}

export const updateUserStreak = async () => {
    try {
        await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/statistics/streak`,
            getAuthConfig()
        )
    } catch (error) {
        throw error;
    }
}