import * as ComputeApi from '@/api/compute'
import * as Types from './mutations-type'
import * as LoginApi from '@/api/login'

export default {
  getUserInfoAction ({ commit }) {
    LoginApi.getUserInfo().then(res => {
      commit(Types.USER_INFO_DATE, res.result.dataInfo)
    }).catch(() => {
      commit(Types.USER_INFO_DATE, {})
    })
  },
  getCountAction ({ commit }) {
    ComputeApi.GetCount().then(res => {
      commit(Types.COOLECTION_COUNT, res.result.collectionCount || 0)
      commit(Types.CART_COUNT, res.result.shopCartCount || 0)
    }).catch(() => {
      commit(Types.COOLECTION_COUNT, 0)
      commit(Types.CART_COUNT, 0)
    })
  }
}
