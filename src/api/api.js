import axios from "axios";
import Router from "next/router";
import { removeToken, getItem, getRefreshToken, getAccessToken, setAccessToken, setRefreshToken } from "../utils/storage";
import GlobalStore from "../stores/GlobalStore";

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
  accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();
  const guid = await getItem('DEVICE_ID');
  return instance({
    url,
    method,
    params: {
      ...params,
      'guid': guid
    },
    data,
    config,
    headers: Object.assign({
      ...headers,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      channelId: "WEB",
      deviceId: guid,
    },
    accessToken && {Authorization: accessToken},
    refreshToken && {'refresh-token': refreshToken}),
    ...options,
  })
    .then(async(response) => {
      if (response.data.status && +response.data.status > 300) {
        throw {
          response: {
            data: {
              message: response.data.message,
            },
          },
        };
      }

      console.log("Path: ", url);
      const accessToken = response?.headers['access-token'];
      const refreshToken = response?.headers['refresh-token'];
      console.log("Response: ", response);
      console.log("New accessToken: ", accessToken);
      console.log("New refreshToken: ", refreshToken);
      if(accessToken) {
        await setAccessToken(accessToken);
        await GlobalStore.updateProfile(accessToken);
      }
      if (refreshToken) {
        await setRefreshToken(refreshToken);
      }
      return response.data;
    })
    .catch(async(error) => {
      console.log('Error: ', error);
      if ((error?.response?.status === 401 || error?.response?.status === 403 || error?.response?.status === 406) && url.includes('/data/chapter/slug')) {
        await removeToken();
        GlobalStore.isLoggedIn = false;
        return {
          'data': {
            'price': 0,
            'free': false,
            'contentEnabled': true,
            'next': '',
            'previous': '',
            'contents': []
          }
        }
      }
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
    }
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
    params: { ...params },
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
    params: { ...params },
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
    params: { ...params},
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
    params: { ...params },
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
    params: { ...params},
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
      params: { ...params},
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
      params: { ...params},
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
      params: { ...params},
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
      params: { ...params },
      data,
      method: "DELETE",
      loading,
      headers,
      options: { ...options, baseURL },
    }),
});

export const server = getHTTPMethod(process.env.NEXT_PUBLIC_API_URL);
export const customer = getHTTPMethod(process.env.NEXT_CUSTOMER_API_URL);
