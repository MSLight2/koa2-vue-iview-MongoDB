import axios from '@/utils/AxiosUtil'

/**
 * 获取购物车列表
 * @method get
 */
export const GetCartList = (params) => {
  return axios({
    method: 'get',
    url: '/api/getShopCart',
    params: params
  })
}

/**
 * 添加、编辑购物车
 * @method post
 * @param {用户id}  userId
 * @param {商品id}  goodsId
 * @param {商品数量}  goodsNum
 * @param {是否为编辑}  isEdit
 */
export const AddOrEditCart = (data) => {
  return axios({
    method: 'post',
    url: '/api/addAndEditShopCart',
    data: data
  })
}

/**
 * 删除购物车
 * @method post
 * @param {商品id} goodsId 
 */
export const DeleteCart = (data) => {
  return axios({
    method: 'post',
    url: '/api/deleteShopCart',
    data: data
  })
}
