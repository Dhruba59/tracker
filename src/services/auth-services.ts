import axios from 'axios';
import HttpClientInstance from './base-services';

import {
  Credentials,
  LoginResponse,
  LogoutResponse,
} from '@models/auth-models';
// import { getGlobalSettings } from './global-services';

import { getAccessToken, ensureTrailingSlash } from '@helpers/auth-helpers';
import { API_END_POINTS } from '@constants/global-constants';
import { LOCAL_STORAGE_KEYS } from '@constants/storage-constants';
// import { AppErrorType } from '@models/global-models';
// import { message } from 'antd';
import { routes } from '@constants/route-constants';
import { useNavigate } from 'react-router-dom';

const httpClient = new HttpClientInstance();

// Login Service
export function userLogin(
  credentials: Credentials
): Promise<LoginResponse> {
  const url = API_END_POINTS.LOGIN;

  return httpClient
    .post(url, { data: { ...credentials } })
    .then((resp) => {
      //? Storing token into Loacal Storage
      localStorage.clear();
      console.log(resp);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.AUTH_TOKEN,
        JSON.stringify({ auth_token: resp.tokens })
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
        JSON.stringify({ access_token: resp.tokens.access.token ?? '' })
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN ,
        JSON.stringify({ access_token: resp.tokens.refresh.token ?? '' })
      );
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

export const userSignUp = async (credentials : any) => {
  const url = API_END_POINTS.SIGN_UP;
  const res = await httpClient.post(url, {data: credentials});
  console.log(res);
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
