import axios, { AxiosInstance } from 'axios';

import { routes } from '@constants/route-constants';
import { NOT_FOUND_STATUS, STATUS_CODES, TIMEOUT_DURATION } from '@constants/global-constants';
import { ensureTrailingSlash, getAccessToken } from '@helpers/auth-helpers';
import { RequestConfig, Response } from '@models/auth-models';
import { getRetoken } from './reToken-service';
import { clearStorage } from '@helpers/global-helpers';
export default class HttpClientInstance {
  private axiosInstance: AxiosInstance;

  constructor(
    baseUrl = process.env.REACT_APP_API_BASE_URL ?? '',
    timeout = TIMEOUT_DURATION
  ) {
    this.axiosInstance = axios.create({
      baseURL: ensureTrailingSlash(baseUrl),
      timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  private request(config: any = {}): Promise<Response> {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response?.status === STATUS_CODES.UNAUTHORIZED && !originalRequest._retry && !error.response?.config?.url.includes('login')) {
          console.log(error);
          try {
            await getRetoken();
            originalRequest._retry = true;
            originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
            return axios(originalRequest);
          } catch (error: any) {
            if(error?.response.status === STATUS_CODES.REFRESH_TOKEN_EXPIRED) {
              clearStorage();
              location.href = routes.login.path;
            }
          }
        }
        
        return Promise.reject(error);
      }
    );

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then(({ status, data }) => resolve({ status, data }))
        .catch((err) => reject({ data: err?.response?.data, status: err?.response?.data?.statusCode })
        );
    });
  }

  private getAuthHeader(config: RequestConfig) {
    return {
      ...config.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    };
  }

  async get(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    const response = await this.request({ method: 'get', url, ...config }).catch((err) => err);
    return this.returnPromiseData(response);
  }

  async post(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    const response = await this.request({ method: 'post', url, ...config }).catch((err) => err);
    return this.returnPromiseData(response);
  }

  async put(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    const response = await this.request({ method: 'put', url, ...config }).catch((err) => err);
    return this.returnPromiseData(response);
  }

  async patch(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    const response = await this.request({ method: 'patch', url, ...config }).catch( (err) => err);
    return this.returnPromiseData(response);
  }

  async delete(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    const response = await this.request({ method: 'delete', url, ...config }).catch(
      (err) => err
    );
    return this.returnPromiseData(response);
  }

  private returnPromiseData(response: Response) {
    if (response.status < NOT_FOUND_STATUS) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response.data);
  }   
}
