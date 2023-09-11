import axios, { AxiosInstance, ResponseType } from 'axios';
import { getRetoken } from './auth-services';

import { routes } from '@constants/route-constants';
import { STATUS_CODES } from '@constants/global-constants';
import { ensureTrailingSlash, getAccessToken } from '@helpers/auth-helpers';

interface RequestConfig {
  headers?: any;
  params?: any;
  data?: any;
  timeout?: number;
  responseType?: ResponseType;
  onUploadProgress?: (progressEvent: any) => void;
}

interface Response {
  status: number;
  data: any;
}

const TIMEOUT_DURATION = 120000;
const NOT_FOUND_STATUS = 400;
/**
 *? Axios Instance
 */
class AxiosConfigService {
  private axiosInstance: AxiosInstance;

  constructor(
    baseUrl = process.env.REACT_APP_API_BASE_URL ?? '',
    timeout = TIMEOUT_DURATION    //? 2 min
  ) {
    this.axiosInstance = axios.create({
      // withCredentials: true,
      baseURL: ensureTrailingSlash(baseUrl),
      timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  private request(config: any = {}): Promise<Response> {
    /**
     *? Request interceptor before sending an error
     * Here we handled unauthorized request
     */

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

  get(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    return this.request({ method: 'get', url, ...config }).catch((err) => err);
  }

  post(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    return this.request({ method: 'post', url, ...config }).catch((err) => err);
  }

  put(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    return this.request({ method: 'put', url, ...config }).catch((err) => err);
  }

  patch(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    return this.request({ method: 'patch', url, ...config }).catch(
      (err) => err
    );
  }

  delete(url: string, config: RequestConfig = {}) {
    config.headers = this.getAuthHeader(config);
    return this.request({ method: 'delete', url, ...config }).catch(
      (err) => err
    );
  }
}

/**
 *? HttpClient Instance
 */
class HttpClientInstance {
  private httpClient: AxiosConfigService;

  constructor() {
    this.httpClient = new AxiosConfigService();
  }

  private returnPromiseData(response: Response) {
    if (response.status < NOT_FOUND_STATUS) {
      return Promise.resolve(response.data);
    }

    return Promise.reject(response.data);
  }

  async get(url: string, config: RequestConfig = {}) {
    let response: Response = await this.httpClient.get(url, config);

    if (response.status === STATUS_CODES.TOKEN_EXPIRED) {
      console.log(response.status );
      // await getRetoken();
      localStorage.clear();
      window.location.href = routes.login.path;

      response = await this.httpClient.get(url, config);
    }

    return this.returnPromiseData(response);
  }

  async post(url: string, config: RequestConfig = {}) {
    let response: Response = await this.httpClient.post(url, config);

    if (response.status === STATUS_CODES.TOKEN_EXPIRED) {
      // await getRetoken();
      localStorage.clear();
      window.location.href = routes.login.path;
      response = await this.httpClient.post(url, config);
    }

    return this.returnPromiseData(response);
  }
  // TODO - That might be good rather than using try catch in every api hit
  // TODO - using it here and sending the data or error from here
  // async post(url: string, config: RequestConfig = {}) {
  //   try {
  //     let response: Response = await this.httpClient.post(url, config);
  //     if (response.status === STATUS_CODES.TOKEN_EXPIRED) {
  //       // await getRetoken();
  //       response = await this.httpClient.post(url, config);
  //     }
  //     return { data: response }
  //   } catch(error: any) {
  //     return { error };
  //   }
  //   // return this.returnPromiseData(response);
  // }

  async put(url: string, config: RequestConfig = {}) {
    let response: Response = await this.httpClient.put(url, config);

    if (response.status === STATUS_CODES.TOKEN_EXPIRED) {
      // await getRetoken();
      localStorage.clear();
      window.location.href = routes.login.path;
      response = await this.httpClient.put(url, config);
    }

    return this.returnPromiseData(response);
  }

  async patch(url: string, config: RequestConfig = {}) {
    let response: Response = await this.httpClient.patch(url, config);

    if (response.status === STATUS_CODES.TOKEN_EXPIRED) {
      // await getRetoken();
      localStorage.clear();
      window.location.href = routes.login.path;
      response = await this.httpClient.patch(url, config);
    }

    return this.returnPromiseData(response);
  }

  async delete(url: string, config: RequestConfig = {}) {
    let response: Response = await this.httpClient.delete(url, config);

    if (response.status === STATUS_CODES.TOKEN_EXPIRED) {
      // await getRetoken();
      localStorage.clear();
      response = await this.httpClient.delete(url, config);
    }

    return this.returnPromiseData(response);
  }
}

export default HttpClientInstance;
