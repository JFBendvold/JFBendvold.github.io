import { createApiClient } from "../utils/ApiClientSetup.js";

const apiClient = createApiClient("/affiliation");

// Add a new affiliation
export async function addAffiliation(code) {
    try {
        const response = await apiClient.post("/add", { code: code });
        return response;
    }
    catch(error) {
        return error.response;
    }
}
