import { createApiClient } from "../utils/ApiClientSetup.js";

const apiClient = createApiClient("/authority");

// Get user's authority
export const getAuthority = async () => {
    try {
        const response = await apiClient.get("/get");
        return response;
    } catch (error) {
        return error.response; //TODO: should this be changed to just error
    }
}

// Add admin
export const addAdmin = async (username) => {
    try {
        const response = await apiClient.put("/setAdmin", { username });
        return response;
    } catch (error) {
        return error.response;
    }
}