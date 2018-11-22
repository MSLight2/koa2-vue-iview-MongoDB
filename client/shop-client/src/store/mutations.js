import * as Types from './mutations-type'
export default {
  [Types.STORE_PRICE_TYPE] (state, type) {
    state.storePriceType = type
  },
  [Types.COOLECTION_COUNT] (state, count) {
    state.collectionCount = count
  },
  [Types.CART_COUNT] (state, count) {
    state.cartCount = count
  }
}
