import axios from '@/utils/AxiosUtil'

/**
 * 获取评价列表
 * @method get
 * @param {商品id} goodsId
 */
export const GetEvaluateList = (params: any) => {
  return axios({
    method: 'get',
    url: '/api/getEvaluateList',
    params: params
  })
}

/**
 * 添加评价
 * @method post
 * @param {商品id} goodsId
 * @param {昵称} nickName
 * @param {邮箱} email
 * @param {评论} review
 * @param {评分} rate
 */
export const AddEvaluate = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/addEvaluate',
    data: data
  })
}

/**
 * 删除评价
 * @method post
 * @param {商品id} goodsId
 */
export const DeleteEvaluate = (data: any) => {
  return axios({
    method: 'post',
    url: '/api/deleteEvaluate',
    data: data
  })
}
