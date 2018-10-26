import axios from '@/utils/AxiosUtil'

/**
 * 根据商品类目获取数据
 * @method get
 * @param {商品类型} goodsType
 * @param {查询页数} page
 * @param {返回行数} pageSize
 */
export const GetGoodsByCategory = (params) => {
  return axios({
    method: 'get',
    url: '/api/getByCategoty',
    params: params
  })
}

/**
 * 获取商品列表
 * @method get
 * @param {商品类型} goodsType 
 * @param {查询页数} page
 * @param {返回行数} pageSize
 * @param {搜索字段} searchWords
 * @param {排序字段：0:销量，1:价格 } orderType
 * @param {排序方式：-1降 1升} sortOrder
 * @param {筛选区间：格式:0-100} filterRange
 * @param {最小价格} minPrice
 * @param {最大价格} maxPrice
 */
export const GetGoodsList = (params) => {
  return axios({
    method: 'get',
    url: '/api/getStoreGoodsList',
    params: params
  })
}

/**
 * 获取商品详情
 * @method get
 * @param {商品id} goodsId
 */
export const GetGoodsDetail = (params) => {
  return axios({
    method: 'get',
    url: '/api/getGoodByID',
    params: params
  })
}
