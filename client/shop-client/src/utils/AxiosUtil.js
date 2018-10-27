import axios from 'axios'
import qs from 'qs'
import LoginStorage from '@/utils/login'

let CancelToken = axios.CancelToken
let source = CancelToken.source()
let axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
  cancelToken: source.token
})

axiosInstance.$cancel = source
// 拦截器
axiosInstance.interceptors.request.use(config => {
  let token = LoginStorage.getToken()
  if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${{ token }}`
  if (config.method.toUpperCase() === 'POST') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(response => {
  let data = response.data
  if (data.code === 1000 || data.code === 1001 || data.code === 1002) {
    // 传入token格式出错 或 未传入token 或 token过期 --> 登录
    data._newLogin = true
  }
  // 返回有token，保存
  let token = data.result.token
  if (token) {
    LoginStorage.setToken(token)
  }
  return data
}, error => {
  return Promise.reject(error)
})

export default axiosInstance
