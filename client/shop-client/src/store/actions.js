import * as ComputeApi from '@/api/compute'
import * as Types from './mutations-type'

export default {
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
