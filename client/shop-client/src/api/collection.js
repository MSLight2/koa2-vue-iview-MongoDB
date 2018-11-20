import axios from '@/utils/AxiosUtil'

/**
 * 获取收藏列表
 * @method get
 * @param {查询页数} page
 * @param {查询行数} pageSize
 */
export const GetCollectionList = (params) => {
  return axios({
    method: 'get',
    url: '/api/getCollection',
    params: params
  })
}

/**
 * 添加收藏
 * @method post
 * @param {商品id} goodsId
 */
export const AddCollection = (data) => {
  return axios({
    method: 'post',
    url: '/api/addCollection',
    data: data
  })
}

/**
 * 删除收藏
 * @method post
 * @param {商品id} goodsId
 */
export const DeleteCollection = (data) => {
  return axios({
    method: 'post',
    url: '/api/deleteCollection',
    data: data
  })
}
