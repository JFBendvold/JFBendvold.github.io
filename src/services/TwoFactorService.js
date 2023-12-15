import { createApiClient } from "../utils/ApiClientSetup.js";

const apiClient = createApiClient("/twoFactor");

// Generates a new token for the user
export async function generateTwoFactor() {
    try {
        const response = await apiClient.post("/add");
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Check if the user has 2FA enabled
export async function checkTwoFactor() {
    try {
        const response = await apiClient.get("/has2fa");
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Disable 2FA for the user
export async function disableTwoFactor() {
    try {
        const response = await apiClient.delete("/delete");
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Verify the 2FA code
export async function verifyTwoFactor(username, code) {
    try {
        const response = await apiClient.post("/verify", {name: username, input: code});
        return response;
    }
    catch(error) {
        return error.response;
    }
}
