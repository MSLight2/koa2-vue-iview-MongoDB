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
      }
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
    FooterTmpl
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
    }
    // 获取商品数
    getGoodsInfo () {}
  }
}
</script>

<style>
  body{
    line-height: inherit;
  }
</style>
