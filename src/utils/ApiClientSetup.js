import axios from 'axios';
import Router from 'next/router'; 
import { scheduleRedirect, attemptToRefreshToken } from './RouterGuard';

const localUrl = "http://10.24.6.33:8080";

// Creates an axios instance with the given url appended to the base url
// The base url is the url of the backend server
// The axios instance is configured to send cookies with reqquests and 
// to intercept 401 responses by attempting to refresh the token
function createApiClient(appendUrl) {

    const localUrl = "http://10.24.6.33:8080";
    const UPPER_ATTEMPT_CAP = 5;

    const apiClient = axios.create({
        baseURL: localUrl + appendUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        withCredentials: true
    });

    apiClient.defaults.attemptCounter = 0;

    // Intercepts 401 responses and attempts to refresh the token
    // Redirects to the home page if the refresh fails
    apiClient.interceptors.response.use(
        response => response,
        async error => {
            if (error.response && error.response.status === 401) {

                apiClient.defaults.attemptCounter++;

                if (apiClient.defaults.attemptCounter >= UPPER_ATTEMPT_CAP) {
                    scheduleRedirect(Router);
                    apiClient.defaults.attemptCounter = 0;
                    return Promise.reject(new Error("Maximum token refresh attempts reached"));
                }

                try {
                    const didRefresh = await attemptToRefreshToken();
                    if (didRefresh) {
                        apiClient.defaults.attemptCounter = 0;
                        return apiClient.request(error.config);
                    }
                    else {
                        scheduleRedirect(Router);
                        return Promise.reject(new Error("Token refresh failed"));
                    }
                } catch (error) {
                    scheduleRedirect(Router);
                    return Promise.reject(new Error("Token refresh failed"));
                }
            }
            return Promise.reject(error);
        }
    );
    return apiClient;
}

export { createApiClient, localUrl };
