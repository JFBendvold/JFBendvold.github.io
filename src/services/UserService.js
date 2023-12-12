import { createApiClient } from "../utils/ApiClientSetup.js";
import { fetchAddress } from "./MetaMaskService.js";

const apiClient = createApiClient("/users");   

// Adds a user to the database
export async function registerUser(user) {
    try {
        const response = await apiClient.post("/add", user);
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Gets a user from the database
export async function getUser(id) {
    try {
        const response = await apiClient.get("/id/" + id);
        return response;
    }
    catch(error) {
        return error.response;
    }
}


// Gets a profile picture (image) from the database by the user's name
export async function getProfilePicture(name) {
    try {
        const response = await apiClient.get("/image/" + name);
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Updates the style for the user's profile
export async function updateStyle(style) {
    try {
        const json = {style: style};

        const response = await apiClient.put("/style", json);
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Get userId
export async function getUserId() {
    try {
        const response = await apiClient.get("/userId");

        if(response.status !== 200) {
            const metamaskAttempt = await fetchAddress();
            return metamaskAttempt;
        }
        return response;
    }
    catch(error) {
        try {
            const metamaskAttempt = await fetchAddress();
            return metamaskAttempt;
        }
        catch(error){
            return error;
        }
    }
}

// Updates the user's profile picture
export async function updateProfilePicture() {
    try {
        const response = await apiClient.put("/changeAvatar");
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Updates the password for the user
export async function updatePassword(old, updated) { //TODO: ADD HTTPS
    try {
        const response = await apiClient.put("/changePassword", {old: old, updated: updated});
        return response;
    }
    catch(error) {
        console.error("Error updating password:", error);
        return error.response;
    }
}

// Fetches user info for all users in a game lobby
export async function getLobbyUsers(usernamesArray) {
    try{
        let users = [];
        for (const username of usernamesArray) {
            const response = await apiClient.get("/id/" + username);
            users.push(response.data);
        }
        if(users.length === 0) {
            console.error("Error fetching lobby users: no users found");
            throw new Error("No users found");
        }
        if(users.length !== usernamesArray.length) {
            console.error("Error fetching lobby users: not all users found");
            throw new Error("Not all users found");
        }
        return users;
    }
    catch (error) {
        console.error("Error fetching lobby users:", error);
        return error.response;
    }
}

// Searches for users by username, username is sent in the body of the request
export async function searchUsers(username) {
    try {
        const response = await apiClient.get("/getUsers/" + username);
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Change the user's country
export async function changeCountry(country) {
    try {
        const response = await apiClient.put("/changeCountry", {country: country});
        return response;
    }
    catch(error) {
        return error.response;
    }
}

// Get number of active users
export async function getActiveUsers() {
    try {
        const response = await apiClient.get("/activeUsers");
        return response;
    }
    catch(error) {
        return error.response;
    }
}