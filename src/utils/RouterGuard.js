import { logoutUser, validateToken, generateToken } from "../services/AuthService.js";
import FingerprintJS from '@fingerprintjs/fingerprintjs'

// List of public routes that do not require authentication
const publicRoutes = ["/", "/login", "/register", "/cookies", "/forgot-password", "/metamask", "/logout"];

// Enforces the guard on the router
export async function enforceGuard(router) {
    try {
        // Does not enforce guard on public routes
        if (publicRoutes.includes(router.pathname)) {
            return;
        }
        else { 
            const response = await validateToken();

            // Redirects to the home page if the token is invalid
            if (response.status !== 200) {

                // Attempts to refresh the token
                const didRefresh = await attemptToRefreshToken();
                if (didRefresh) {
                    return;
                }

                // Redirects to home if the refresh fails and logs the user out
                scheduleRedirect(router);
            } else {
                return;
            }
        }
        // Redirects to the home page if the token is invalid
    } catch (error) {
        console.log("Error during token validation: ", error.message);
        scheduleRedirect(router);
    }
}

// Schedules a redirect to the home page and logs the user out
export function scheduleRedirect(router) {
    setTimeout(() => {
        if (router.isReady) {
            router.replace("/");
            logoutUser();
        }
    }, 100);
}

// Function to attempt refresh of the token using the fingerprint
export async function attemptToRefreshToken() { 
    let fp;
    console.log("Attempting to refresh token");
    try {
        // Asyncronously loads the fingerprint of the user browser
        fp = await FingerprintJS.load();
    } catch (error) {
        console.log("An error occurred while loading FingerprintJS: ", error.message);
        return false;
    }

    // Retrieves the fingerprint
    let result;
    try {
        result = await fp.get();
    } catch (error) {
        console.log("Error retrieving fingerprint: ", error.message);
        return false;
    }

    const fingerprint = result.visitorId;

    // Attempts to generate a token using the fingerprint
    try {
        const response = await generateToken(fingerprint);
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}