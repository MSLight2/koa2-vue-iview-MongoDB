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

/**
 * 编辑用户信息
 * @method post
 * @param {姓名} name
 * @param {昵称} nickName
 * @param {年龄} age
 * @param {性别} sex
 * @param {邮箱} email
 * @param {地址} address
 * @param {生日} birthday
 * @param {电话} phone
 * @param {座右铭} motto 非必传
 */
export const EditUserInfo = (data) => {
  return axios({
    method: 'post',
    url: '/api/editUserInfo',
    data: data
  })
}

/**
 * 编辑用户座右铭
 * @method post
 * @param {座右铭} motto
 */
export const EditUserMotto = (data) => {
  return axios({
    method: 'post',
    url: '/api/editUserMotto',
    data: data
  })
}
