import { createApiClient } from "../utils/ApiClientSetup.js";

const apiClient = createApiClient("/auth");

// Authenticates the user
export async function authenticateUser(user) {
    try {
        const response = await apiClient.post("/authenticate", user);
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Logs the user into the application and sets a cookie
export async function loginUser(user) {
    try {
        const response = await authenticateUser(user);
        const token = response.data.jwt_token;
        const cookieResponse = await apiClient.post("/set-cookie", {
            "token": token
        });
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Logs the user out of the application
export async function logoutUser() {
    try {
        const response = await apiClient.post("/delete-cookie");
        return response;
    }
    catch(error) {
        return error; //TODO: return only error?
    }
}

// Generates a new token for the user
export async function generateToken(fingerprint) {
    try {
        const response = await apiClient.post("/generateJWT", {"fingerprint": fingerprint});
        return response;
    }
    catch(error) {
        return error;
    }
}

// Validates the token of the user
export async function validateToken() 
{
    try {
        const response = await apiClient.get("/validateToken");
        return response;
    }
    catch(error) {
        return error;
    }
}


