import * as Types from './mutations-type'
export default {
  [Types.STORE_PRICE_TYPE] (state, type) {
    state.storePriceType = type
  }
}
