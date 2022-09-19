import { defineStore } from "pinia";
import * as ComputeApi from '@/api/compute'
import * as LoginApi from '@/api/login'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 商品详情价格筛选类型
    storePriceType: null,
    // 用户信息
    userInfoData: {},
    // 收藏数量
    collectionCount: 0,
    // 购物车数量
    cartCount: 0
  }),
  getters: {
    getStorePriceType: state => state.storePriceType,
    getUserInfoData: state => state.userInfoData,
    getCollectionCount: state => state.collectionCount,
    getCartCount: state => state.cartCount
  },
  actions: {
    async getUserInfoAction() {
      const _data: Record<string, any> = await LoginApi.getUserInfo();
      this.userInfoData = _data.result.dataInfo || {};
    },
    async getCountAction() {
      const _data: Record<string, any> = await ComputeApi.GetCount();
      this.collectionCount = _data.result.collectionCount || {};
      this.cartCount = _data.result.shopCartCount || {};
    }
  }
});