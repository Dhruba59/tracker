import axios from 'axios';
import HttpClientInstance from './base-services';

import {
  Credentials,
  LoginResponse,
  LogoutResponse,
} from '@models/auth-models';
import { getAccessToken, ensureTrailingSlash } from '@helpers/auth-helpers';
import { API_END_POINTS } from '@constants/global-constants';
import { LOCAL_STORAGE_KEYS } from '@constants/storage-constants';
import { routes } from '@constants/route-constants';
import { ResponseType } from '@models/global-models';

const httpClient = new HttpClientInstance();

// Login Service
export function userLogin(
  credentials: Credentials
): Promise<ResponseType> {
  const url = API_END_POINTS.LOGIN;

  return httpClient
    .post(url, { data: { ...credentials } })
    .then((resp) => {
      //? Storing token into Loacal Storage
      localStorage.clear();
      console.log(resp);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.AUTH_TOKEN,
        JSON.stringify({ 
          access_token: resp.payload.access_token ?? '', 
          refresh_token: resp.payload.refresh_token ?? '' 
         })
      );
      // localStorage.setItem(
      //   LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
      //   JSON.stringify({
      //     access_token: resp.payload.access_token ?? '', 
      //     refresh_token: resp.payload.refresh_token ?? '' 
      //   })
      // );
      // localStorage.setItem(
      //   LOCAL_STORAGE_KEYS.REFRESH_TOKEN ,
      //   JSON.stringify({ refresh_token: resp.payload.refresh_token ?? '' })
      // );
      location.href = routes.dashboard.path;
      // useNavigate();

      //? Storing global settings into localStorage after successful login
      // let settings = await getGlobalSettings().catch((err: AppErrorType) =>
      //   message.error(err.message)
      // );

      return resp;
      // return settings ?? resp;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}

export const userSignUp = (credentials : any) => {
  const url = API_END_POINTS.SIGN_UP;
  return httpClient.post(url, {data: credentials});
};

// Logout Service
export function userLogout(): Promise<LogoutResponse> {
  const url = API_END_POINTS.LOGOUT;

  return httpClient.delete(url);
}

// Logout Service
export function getRetoken(): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    axios
      .create({
        // withCredentials: true,
        baseURL: ensureTrailingSlash(process.env.REACT_APP_API_BASE_URL ?? ''),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .get(API_END_POINTS.RE_TOKEN)
      .then((resp) => {
        //? Replace auth_token with
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.AUTH_TOKEN,
          JSON.stringify({ access_token: resp.data?.token ?? '' })
        );

        resolve(resp.data);
      })
      .catch((err) => {
        localStorage.clear();
        sessionStorage.clear();
        location.href = routes.login.path;
        reject(err);
      });
  });
}
