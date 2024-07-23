import axios, { AxiosResponse } from 'axios'
import { StorageService } from './local-storage.service';
import { API_BASE_URL } from '../constants';

export default class ApiService {

    static init(baseURL : string) {
        axios.defaults.baseURL = baseURL;
    }

    static setHeader() {
        const token = StorageService.getAuthToken();
        axios.defaults.headers.common["Authorization"] = token ? `Bearer ${StorageService.getAuthToken()}` : undefined
    }

    static removeHeader() {
        axios.defaults.headers.common = {}
    }

    static get(url: string) {
        this.setHeader()
        return axios.get(url)
    }

    static post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        this.setHeader
        return axios.post<T>(url, data)
    }

    static put(url: string, data: any) {
        this.setHeader
        return axios.put(url, data)
    }

    static delete(url: string) {
        this.setHeader
        return axios.delete(url)
    }

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
    static customRequest(data: any) {
        return axios(data)
    }
}

if(API_BASE_URL) ApiService.init(API_BASE_URL)
