export const getToken = () => {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
}

export const removeToken = () => {
  localStorage.removeItem('accessToken')
  sessionStorage.removeItem('accessToken')
}