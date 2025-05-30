/**
 * An Array of routes that are publicly accessible.
 * This routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/","/new-verification","/verify"];

/**
 * An array of routes that used for authentication.
 * These routes will be redirected logging user to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up","/error","/reset","/new-password"];

/**
 * This is prefix fot api authentication routes
 *  Routes that are start with this prefix are used for api authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * This is the default redirect route after successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
