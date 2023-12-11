import { createApiClient } from "../utils/ApiClientSetup.js";

const apiClient = createApiClient("/feedback");

// Sends feedback to the database
export async function sendFeedback(title, content) {
    try {
        const response = await apiClient.post("/add", {title: title, comment: content});
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Fetches all feedbacks from the database
export async function getAllFeedbacks(pageNumber = 1, itemsPerPage = 10) {
    try {
        const response = await apiClient.get(`/all?pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`);
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Deletes a feedback from the database
export async function deleteFeedback(id) {
    try {
        const response = await apiClient.delete(`/delete/${id}`);
        return response;
    }
    catch(error) {
        return error.response;
    }
}