import { createApiClient } from "../utils/ApiClientSetup.js";

const apiClient = createApiClient("/questions");

// Add a new question
export async function addQuestion(question) {
    try {
        const response = await apiClient.post("/addQuestion", question);
        return response;
    }
    catch(error) {
        return error.response;
    }
}
