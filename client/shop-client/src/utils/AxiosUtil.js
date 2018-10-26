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

let token = LoginStorage.getToken()
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${{ token }}`

axiosInstance.$cancel = source
// 拦截器
axiosInstance.interceptors.request.use(config => {
  if (config.method.toUpperCase() === 'POST') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(response => {
  let data = response.data
  return data
}, error => {
  return Promise.reject(error)
})

export default axiosInstance
