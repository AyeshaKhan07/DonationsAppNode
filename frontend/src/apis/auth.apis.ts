import { API_URLS } from "../constants";
import ApiService from "../services/api.service";
import { StorageService } from "../services/local-storage.service";
import { ISignInApiResponse, ISignInPayload } from "../types/auth/sign-in.types";
import { ISignUpApiResponse, ISignUpPayload } from "../types/auth/sign-up.types";

export default class AuthApis {
    static async signIn(data: ISignInPayload) {
        const response = await ApiService.post<ISignInApiResponse>(API_URLS.SIGNIN_URL, data);
        StorageService.setAuthToken(response.data.accessToken)
    }

    static async signUp(data: ISignUpPayload) {
        const response = await ApiService.post<ISignUpApiResponse>(API_URLS.SIGNUP_URL, data);
        StorageService.setAuthToken(response.data.accessToken)
    }
}
