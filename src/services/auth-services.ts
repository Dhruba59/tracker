import axios from 'axios';
import HttpClientInstance from './base-services';

import {
  Credentials,
  EmailVerificationPayload,
  LoginResponse,
  LogoutResponse,
  RequestResetPasswordCredentials,
  ResetPasswordCredentials,
} from '@models/auth-models';
import { getAccessToken, ensureTrailingSlash, getRefreshToken } from '@helpers/auth-helpers';
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
      return resp;
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}

// export const userLogin = async (credentials: Credentials) => {
//   const url = API_END_POINTS.LOGIN;
//   return await httpClient.post(url, { data: { ...credentials }});
// } 

export const userSignUp = (credentials : any) => {
  const url = API_END_POINTS.SIGN_UP;
  return httpClient.post(url, {data: credentials});
};

export const requestResetPassword = (data : RequestResetPasswordCredentials) => {
  const url = API_END_POINTS.REQUEST_RESET_PASSWORD;
  return httpClient.post(url, { data });
};

export const resetPassword = (credentials : ResetPasswordCredentials) => {
  const url = API_END_POINTS.RESET_PASSWORD;
  return httpClient.post(url, {data: credentials});
};

export const verifyEmail = (data : EmailVerificationPayload) => {
  const url = API_END_POINTS.VERIFY_EMAIL;
  return httpClient.get(url, { params: data });
};

// Logout Service
// export function userLogout(): Promise<LogoutResponse> {
//   const url = API_END_POINTS.LOGOUT;
//   return httpClient.delete(url);
// }
export function userLogout() {
  localStorage.clear();
  window.location.pathname = routes.login.path;
}