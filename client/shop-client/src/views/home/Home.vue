<template>
  <div>
    <header-tmpl></header-tmpl>
    <nav-bar></nav-bar>
    <section-shop></section-shop>
    <section-slide :title-config="configHot"></section-slide>
    <hot-detail></hot-detail>
    <section-slide :title-config="configRecommend"></section-slide>
    <top-selling></top-selling>
    <news-letter></news-letter>
    <footer-tmpl></footer-tmpl>
    <iview-modal
      :is-show="modalShow"
      type="warning"
      content="这是一个提示"
      @close="modalShow = false">
    </iview-modal>
  </div>
</template>

<script>
import HeaderTmpl from '@/components/header/HeaderTmpl'
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import SectionShop from '@/views/home/children/SectionShop'
import SectionSlide from '@/views/home/children/SectionSlide'
import HotDetail from '@/views/home/children/HotDetail'
import TopSelling from '@/views/home/children/TopSelling'
import NewsLetter from '@/components/puppetComponent/NewsLetter'
import IviewModal from '@/components/puppetComponent/Modal/IviewModal'
import * as GoodsApi from '@/api/goods'
import * as LoginApi from '@/api/login'
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
      categoryType: 0,
      userInfoData: {},
      hotInfoData: {},
      recommendInfoData: {},
      collectionInfoData: {},
      shopCartInfoData: {}
    }
  },
  components: {
    HeaderTmpl,
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
  },
  methods: {
    // 获取登录用户的信息数据
    getUserInfo () {
      if (!LoginStorage.getToken()) {
        return
      }
      LoginApi.getUserInfo().then(res => {
      }).catch(err => {
      })
    },
    // 通过类目获取商品数
    getGoodsInfoByCategoty (type = 1) {
      let params = {
        goodsType: type,
        pageSize: 12
      }
      GoodsApi.GetGoodsByCategory(params).then(res => {
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
