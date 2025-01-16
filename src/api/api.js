import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { removeToken } from "../utils/storage";

import * as jose from "jose";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseCustomerURL: process.env.NEXT_CUSTOMER_API_URL,
  timeout: process.env.NEXT_PUBLIC_API_TIMEOUT,
});

const handleError = async (error, hideError) => {
  const hideErrorNoti = hideError;
  const errorMessages = {
    golobal:
      "System is in maintenance. We are on it. Please check back in a few minute.",
    timeout: "Request is timeout, check internet connection",
    sessionExprire: "Session is expried, please re-login again",
  };
  let errorMessage = errorMessages.golobal;

  if (error?.response?.data?.error) {
    errorMessage = error.response.data.error;
  }
  if (error.code === "ECONNABORTED") {
    errorMessage = errorMessages.timeout;
  }
  console.log("error ===>", error.response);
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    errorMessage = errorMessages.sessionExprire;
    removeToken();
    ProfileStore.setProfile({});
    Router.push("/login");
    // logout
  }
  if (!hideErrorNoti && errorMessage) {
    // show error message here
    // toast(errorMessage, {
    //   type: "error",
    //   theme: "colored",
    // })
  }

  return Promise.reject(error.response, errorMessage);
};

const sendRequest = async ({
  url,
  method,
  params,
  data,
  headers,
  options,
  hideError,
  isServer,
  config,
  accessToken = "",
}) => {
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);
  const access_token =
    accessToken || (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : "")
    const clientToken = await new jose.SignJWT({ 'urn:example:claim': true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('1m')
    .sign(secret)
  console.log('clientToken ===>')
  return instance({
    url,
    method,
    params,
    data,
    config,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Authorization": access_token ? `${access_token}` : "",
      channelId: 'WEB',
      deviceId: typeof window !== 'undefined' ? localStorage.getItem('DEVICE_ID') : '',
      'Client-Auth': clientToken,
      ...headers,
    },
    ...options,
  })
    .then((response) => {
      if (response.data.status && +response.data.status > 300) {
        throw {
          response: {
            data: {
              message: response.data.message,
            },
          },
        };
      }
      return response.data;
    })
    .catch((error) =>
      handleError(error, hideError, () =>
        sendRequest({
          url,
          method,
          params,
          data,
          headers,
          options,
          hideError,
          isServer,
          config,
        })
      )
    );
};

export const get = ({
  url = "",
  params = {},
  loading = true,
  headers = {},
  options = {},
  hideError = false,
  isServer = false,
}) =>
  sendRequest({
    url,
    params: { ...params, key: "trinhkhoi1811trinhkhoi1811@@@@trinhkhoi"},
    method: "GET",
    loading,
    headers,
    options,
    hideError,
    isServer,
  });

export const post = ({
  url,
  params = {},
  data,
  loading = true,
  headers = {},
  options = {},
  hideError = false,
  config = {},
  accessToken = "",
}) =>
  sendRequest({
    url,
    params: { ...params, key: "trinhkhoi1811trinhkhoi1811@@@@trinhkhoi" },
    data,
    method: "POST",
    loading,
    headers,
    options,
    config,
    hideError,
    accessToken,
  });

export const put = ({
  url,
  params,
  data,
  loading = true,
  headers = {},
  options,
  accessToken,
}) =>
  sendRequest({
    url,
    params: { ...params, key: "trinhkhoi1811trinhkhoi1811@@@@trinhkhoi" },
    data,
    method: "PUT",
    loading,
    headers,
    options,
    accessToken,
  });

export const patch = ({
  url,
  params,
  data,
  loading = true,
  headers = {},
  options,
}) =>
  sendRequest({
    url,
    params: { ...params, key: "trinhkhoi1811trinhkhoi1811@@@@trinhkhoi" },
    data,
    method: "PATCH",
    loading,
    headers,
    options,
  });

export const deleteData = ({
  url,
  params,
  data,
  loading = true,
  headers = {},
  options,
}) =>
  sendRequest({
    url,
    params: { ...params, key: "trinhkhoi1811trinhkhoi1811@@@@trinhkhoi" },
    data,
    method: "DELETE",
    loading,
    headers,
    options,
  });

export const getHTTPMethod = (baseURL) => ({
  get: ({
    url,
    params = {},
    loading = false,
    headers = {},
    options = {},
    hideError = false,
    isServer = false,
  }) =>
    sendRequest({
      url,
      params: { ...params, key: "trinhkhoi1811trinhkhoi1811@@@@trinhkhoi" },
      method: "GET",
      loading,
      headers,
      options: { ...options, baseURL },
      hideError,
      isServer,
    }),
  post: ({
    url,
    params = {},
    data = {},
    loading = true,
    headers = {},
    options = {},
    hideError = false,
  }) =>
    sendRequest({
      url,
      params: { ...params, key: "trinhkhoi1811trinhkhoi1811@@@@trinhkhoi" },
      data,
      method: "POST",
      loading,
      headers,
      options: { ...options, baseURL },
      hideError,
    }),
  put: ({ url, params, data, loading = true, headers = {}, options = {} }) =>
    sendRequest({
      url,
      params: { ...params, key: "trinhkhoi1811trinhkhoi1811@@@@trinhkhoi" },
      data,
      method: "PUT",
      loading,
      headers,
      options: { ...options, baseURL },
    }),
  deleteData: ({
    url,
    params,
    data,
    loading = true,
    headers = {},
    options = {},
  }) =>
    sendRequest({
      url,
      params: { ...params, key: "trinhkhoi1811trinhkhoi1811@@@@trinhkhoi" },
      data,
      method: "DELETE",
      loading,
      headers,
      options: { ...options, baseURL },
    }),
});

export const server = getHTTPMethod(process.env.NEXT_PUBLIC_API_URL);
