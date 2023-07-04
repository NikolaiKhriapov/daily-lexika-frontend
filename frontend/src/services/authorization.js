import axios from "axios";

export const register = async (applicationUser) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`,
            applicationUser
        )
    } catch (error) {
        throw error;
    }
}

export const login = async (emailAndPassword) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
            emailAndPassword
        )
    } catch (error) {
        throw error;
    }
}