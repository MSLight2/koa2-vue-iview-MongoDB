import axios from 'axios'
import qs from 'qs'

let CancelToken = axios.CancelToken
let source = CancelToken.source()
let axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
  cancelToken: source.token
})

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmE5YjE1NjQ5YzBmOTI3NTA2YjM4OGMiLCJpYXQiOjE1NDA1MzYxMzcsImV4cCI6MTU0MDUzOTczN30.v9Uey6KfAZsaqQjru5RKv79GaUtFfxpKEnSwX-wVo28'
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
