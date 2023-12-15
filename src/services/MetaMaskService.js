import { createApiClient } from "../utils/ApiClientSetup.js";

const apiClient = createApiClient("/metamask"); 

// Authenticates the user with metamask signature
export async function metamaskOneTimeLogin(signature, fingerprint, timestamp, username) {
    try {
        const response = await apiClient.post("/auth", {"signature": signature, "fingerprint": fingerprint, "timestamp": timestamp, "username": username});
        return response;
    }
    catch(error) {
        return error;
    }
}

// Test
export async function fetchAddress() {
    try {
        const response = await apiClient.get("/address");
        return response.data;
    }
    catch(error) {
        return error;
    }
}