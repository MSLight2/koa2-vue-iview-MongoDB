import axios from '@/utils/AxiosUtil'

/**
 * 获取用户收货地址
 * @method get
 */
export const GetAddress = (params) => {
  return axios({
    method: 'get',
    url: '/api/getAddressList',
    params: params
  })
}

/**
 * 添加用户收货地址
 * @method post
 * @param {昵称} nickName
 * @param {邮箱地址} email
 * @param {详细地址} detailAddress
 * @param {城市} city
 * @param {手机号} phone
 * @param {是否为默认地址} isDefault
 */
export const AddAddress = (data) => {
  return axios({
    method: 'post',
    url: '/api/addAddress',
    data: data
  })
}

/**
 * 编辑用户收货地址
 * @method post
 * @param {地址id} addressId
 * @param {昵称} nickName
 * @param {邮箱地址} email
 * @param {详细地址} detailAddress
 * @param {城市} city
 * @param {手机号} phone
 * @param {是否为默认地址} isDefault
 */
export const EditAddress = (data) => {
  return axios({
    method: 'post',
    url: '/api/editAddress',
    data: data
  })
}

/**
 * 删除用户收货地址
 * @method post
 * @param {地址id} addressId
 */
export const DeleteAddress = (data) => {
  return axios({
    method: 'post',
    url: '/api/deleteAddress',
    data: data
  })
}
