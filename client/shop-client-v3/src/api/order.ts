import axios from '@/utils/AxiosUtil'

/**
 * 获取未支付订单
 * @method get
 */
export const GetCheckoutList = (params: any) => {
  return axios({
    method: 'get',
    url: '/api/getCheckoutList',
    params: params
  })
}

/**
 * 获取已支付订单
 * @method get
 */
export const GetPayCheckoutList = (params: any) => {
  return axios({
    method: 'get',
    url: '/api/getPayCheckoutList',
    params: params
  })
}

/**
 * 获取所有订单
 * @method get
 */
export const GetAllOrders = (params: any) => {
  return axios({
    method: 'get',
    url: '/api/getAllOrders',
    params: params
  })
}

/**
 * 生成订单
 * @method post
 * @param {商品购物列表} goodsCartList
 */
export const AddCheckout = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/addCheckout',
    data: data
  })
}

/**
 * 删除订单
 * @method post
 * @param {商品id} goodsId
 */
export const DeleteCheckout = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/deleteCheckout',
    data: data
  })
}

/**
 * 修改订状态（支付）
 * @method post
 * @param {商品id数组} goodsIdList
 * @param {支付金额} payPrice
 */
export const EditPayCheckout = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/editCheckoutStatus',
    data: data
  })
}

/**
 * 获取支付订单状态
 * @method get
 */
export const GetCheckoutStatus = (params: any) => {
  return axios({
    method: 'get',
    url: '/api/getCheckoutStatus',
    params: params
  })
}
