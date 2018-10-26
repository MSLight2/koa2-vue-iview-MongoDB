import axios from '@/utils/AxiosUtil'

/**
 * 获取订单
 * @method get
 */
export const GetCheckoutList = (params) => {
  return axios({
    method: 'get',
    url: '/api/getCheckoutList',
    params: params
  })
}

/**
 * 生成订单
 * @method post
 * @param {商品id} goodsId
 * @param {商品数} goodsNum
 * @param {商品备注} goodsRemark
 */
export const AddCheckout = (data) => {
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
export const DeleteCheckout = (data) => {
  return axios({
    method: 'post',
    url: '/api/deleteCheckout',
    data: data
  })
}
