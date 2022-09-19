import axios from 'axios'
import type { AxiosInstance, HeadersDefaults } from 'axios'
import qs from 'qs'
import LoginStorage from '@/utils/login'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 60000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  cancelToken: source.token
})

// axiosInstance.$cancel = source
// 拦截器
axiosInstance.interceptors.request.use(config => {
  const token = LoginStorage.getToken()
  const header: HeadersDefaults = config.headers as unknown as HeadersDefaults;
  if (token) header.common['Authorization'] = 'Bearer ' + token
  if (config.method?.toUpperCase() === 'POST') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(response => {
  const data = response.data
  if (data.code === 1000 || data.code === 1001 || data.code === 1002) {
    // 传入token格式出错 或 未传入token 或 token过期 --> 登录
    LoginStorage.setLoginStatus(false)
    return Promise.reject(data)
  }
  // 返回有token，保存
  const token = data.result.token
  if (token) {
    LoginStorage.setLoginStatus(true)
    LoginStorage.setToken(token)
  }
  return data
}, error => {
  return Promise.reject(error)
})

export default axiosInstance
