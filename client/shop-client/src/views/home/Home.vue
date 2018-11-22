<template>
  <div>
    <nav-bar></nav-bar>
    <section-shop @buyNow="sectionBuyNow"></section-shop>
    <section-slide
      :title-config="configHot"
      :data-list="hotInfoData"
      @tabSwitch="tabSwitch">
    </section-slide>
    <hot-detail @buyNow="hotBuyNow"></hot-detail>
    <section-slide
      :title-config="configRecommend"
      :data-list="recommendInfoData"
      @tabSwitch="tabSwitchTwo">
    </section-slide>
    <top-selling
      :houes-data-list="houseInfoData"
      :camera-data-list="cameraInfoData"
      :phone-data-list="phoneInfoData">
    </top-selling>
    <news-letter></news-letter>
    <footer-tmpl></footer-tmpl>
    <iview-modal
      :is-show="modalShow"
      :type="modalType"
      :content="modelContent"
      :sureText="modalSureText"
      @close="modalShow = false">
    </iview-modal>
  </div>
</template>

<script>
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import SectionShop from '@/views/home/children/SectionShop'
import SectionSlide from '@/views/home/children/SectionSlide'
import HotDetail from '@/views/home/children/HotDetail'
import TopSelling from '@/views/home/children/TopSelling'
import NewsLetter from '@/components/puppetComponent/NewsLetter'
import IviewModal from '@/components/puppetComponent/Modal/IviewModal'
import * as GoodsApi from '@/api/goods'
import LoginStorage from '@/utils/login'

export default {
  data () {
    return {
      configHot: {
        title: '热卖',
        categories: ['AI', '手机', '耳机']
      },
      configRecommend: {
        title: '推荐',
        categories: ['高配电脑', '智能手机', 'AI智能家电', '相机']
      },
      modalShow: false,
      modalType: 'warning',
      modelContent: '',
      modalSureText: '确定',
      categoryType: 0,
      hotInfoData: [],
      recommendInfoData: [],
      // 头部数据
      collectionInfoData: {},
      shopCartInfoData: {},
      // 底部数据
      houseInfoData: [],
      cameraInfoData: [],
      phoneInfoData: []
    }
  },
  components: {
    NavBar,
    SectionShop,
    SectionSlide,
    HotDetail,
    TopSelling,
    NewsLetter,
    FooterTmpl,
    IviewModal
  },
  mounted () {
    // this.getUserInfoData()
    this.initData()
  },
  methods: {
    initData () {
      // 热卖
      this.getGoodsInfoByCategoty({ type: 6 }, (res) => {
        this.hotInfoData = res.result
      })
      // 推荐
      this.getGoodsInfoByCategoty({ type: 1 }, (res) => {
        this.recommendInfoData = res.result
      })
      // 底部 家电-相机-耳机
      this.getGoodsInfoByCategoty({ type: 5, size: 9 }, (res) => {
        this.houseInfoData = res.result
      })
      this.getGoodsInfoByCategoty({ type: 4, size: 9 }, (res) => {
        this.cameraInfoData = res.result
      })
      this.getGoodsInfoByCategoty({ type: 3, size: 9 }, (res) => {
        this.phoneInfoData = res.result
      })
    },
    // 通过类目获取商品数
    async getGoodsInfoByCategoty ({ type = 1, size = 12 }, fn) {
      let params = {
        goodsType: type,
        pageSize: size
      }
      GoodsApi.GetGoodsByCategory(params).then(res => {
        if (fn) fn(res)
      })
    },
    // 立即购买
    sectionBuyNow (type) {
      this.$router.push({
        name: 'store',
        query: { type: type }
      })
    },
    tabSwitch (index) {
      let goodsType = 6
      if (index === 0) goodsType = 6
      if (index === 1) goodsType = 2
      if (index === 2) goodsType = 3
      this.getGoodsInfoByCategoty({ type: goodsType }, (res) => {
        this.hotInfoData = res.result
      })
    },
    tabSwitchTwo (index) {
      let goodsType = 1
      if (index === 0) goodsType = 1
      if (index === 1) goodsType = 2
      if (index === 2) goodsType = 5
      if (index === 3) goodsType = 4
      this.getGoodsInfoByCategoty({ type: goodsType }, (res) => {
        this.recommendInfoData = res.result
      })
    },
    // 畅销购买
    hotBuyNow () {
      this.$router.push({
        name: 'store',
        query: { type: Math.floor(Math.random() * 6 + 1) }
      })
    }
  }
}
</script>

<style>
  body{
    line-height: inherit;
  }
</style>
