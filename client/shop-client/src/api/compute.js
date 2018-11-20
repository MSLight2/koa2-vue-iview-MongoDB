import axios from '@/utils/AxiosUtil'

/**
 * 统计数量获取
 * @method get
 */
export const GetCount = (params) => {
  return axios({
    method: 'get',
    url: '/api/getCount',
    params: params
  })
}
