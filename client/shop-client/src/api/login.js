import axios from '@/utils/AxiosUtil'

/**
 * 登录
 * @method post
 * @param {用户名} userName
 * @param {密码} password
 */
export const UserLogin = (data) => {
  return axios({
    method: 'post',
    url: '/api/login',
    data: data
  })
}

/**
 * 用户注册
 * @method post
 * @param {用户名} userName
 * @param {昵称} nickName
 * @param {密码} password
 * @param {确认密码} passwordAgian
 */
export const UserRegist = (data) => {
  return axios({
    method: 'post',
    url: '/api/regist',
    data: data
  })
}

/**
 * 重置密码
 * @method post
 * @param {用户名} userName
 * @param {密码} password
 * @param {确认密码} passwordAgian
 */
export const UserResetPassword = (data) => {
  return axios({
    method: 'post',
    url: '/api/resetPassword',
    data: data
  })
}

/**
 * 获取用户信息
 * @method get
 */
export const getUserInfo = (params) => {
  return axios({
    method: 'get',
    url: '/api/userInfo',
    params: params
  })
}
