import { createApiClient } from "../utils/ApiClientSetup.js";

const apiClient = createApiClient("/categories");  

// Gets a category from the database by the category id
export async function getCategoryById(id) {
    try {
        const response = await apiClient.get("/id/" + id);
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Gets all categories from the database
export async function getAllCategories() {
    try {
        const response = await apiClient.get("/all");
        return response;
    }
    catch(error) {
        return error.response;
    }
}