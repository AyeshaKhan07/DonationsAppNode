import { AUTH_TOKEN, USER_ROLE } from "../constants";

export class StorageService {

    static setAuthToken(token: string) {
        this.setItem(AUTH_TOKEN, token);
    }

    static getAuthToken() {
        return this.getItem(AUTH_TOKEN)
    }

    static removeAuthToken() {
        this.removeItem(AUTH_TOKEN);
    }

    static setUserType(role: string) {
        this.setItem(USER_ROLE, role)
    }

    static getUserRole() {
        return this.getItem(USER_ROLE);
    }

    static removeUserRole() {
        this.removeItem(USER_ROLE);
    }

    static setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    static getItem(key: string) {
        return localStorage.getItem(key);
    }

    static removeItem(key: string) {
        localStorage.removeItem(key);
    }

    
}