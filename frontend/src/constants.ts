export const API_BASE_URL = import.meta.env.VITE_BASE_URL
export const AUTH_TOKEN = "AUTH_TOKEN"
export const USER_ROLE = "USER_ROLE"

export const API_URLS = {
    SIGNIN_URL: "/login",
    SIGNUP_URL: "/signup",
}

export const WEB_URLS = {
    HOME: "/"
}

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i