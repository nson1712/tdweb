export const setAccessToken = async(accessToken) => {
  localStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('accessToken', accessToken);
}

export const setRefreshToken = async(refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
  sessionStorage.setItem('refreshToken', refreshToken);
}

export const getAccessToken = async() => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
}

export const getRefreshToken = async() => {
  return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
}

export const setItem = async(key, value) => {
  localStorage.setItem(key, value);
}

export const getItem = async(key) => {
  return localStorage.getItem(key) || '';
}

export const removeToken = async() => {
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('refreshToken');
}