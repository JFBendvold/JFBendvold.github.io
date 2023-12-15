import { createApiClient } from "../utils/ApiClientSetup.js";

const apiClient = createApiClient("/rewards");

// Get referral code
export async function getReferralCode() {
    try {
        const response = await apiClient.get("/get");
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Generate referral code
export async function generateReferralCode() {
    try {
        const response = await apiClient.post("/add");
        return response;
    }
    catch(error) {
        return error.response;
    }
}
