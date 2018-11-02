<template>
  <div>
    <header-tmpl></header-tmpl>
    <bread-crumb :titles="breadCrumbTitles"></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <!-- Product main img -->
          <product-slide-img :img-list="imgList"></product-slide-img>
          <!-- Product details -->
          <product-detail-desc :data-info="goodDetailInfo"></product-detail-desc>
          <!-- Product tab -->
          <product-tab></product-tab>
        </div>
      </div>
    </div>
    <related-products></related-products>
    <news-letter></news-letter>
    <footer-tmpl></footer-tmpl>
  </div>
</template>

<script>
import HeaderTmpl from '@/components/header/HeaderTmpl'
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import BreadCrumb from '@/components/puppetComponent/BreadCrumb'
import ProductSlideImg from './children/ProductSlideImg'
import ProductDetailDesc from './children/ProductDetailDesc'
import ProductTab from './children/ProductTab'
import RelatedProducts from './children/RelatedProducts'
import NewsLetter from '@/components/puppetComponent/NewsLetter'
import * as GoodsApi from '@/api/goods'

export default {
  data () {
    return {
      breadCrumbTitles: {
        titleArr: ['首页', '配件', '笔记本', '苹果电脑'],
        path: []
      },
      goodDetailInfo: {},
      imgList: []
    }
  },
  components: {
    HeaderTmpl,
    NavBar,
    BreadCrumb,
    ProductSlideImg,
    ProductDetailDesc,
    ProductTab,
    RelatedProducts,
    NewsLetter,
    FooterTmpl
  },
  mounted () {
    if (this.$route.query.id) {
      this.getGoodsDetailData(this.$route.query.id)
    } else {
      this.$Message.warning('你是真的皮╭(╯^╰)╮')
      setTimeout(() => {
        this.$router.go(-1)
      }, 3000)
    }
  },
  methods: {
    getGoodsDetailData (id) {
      GoodsApi.GetGoodsDetail({ goodsId: id }).then(res => {
        console.log(res.result)
        this.goodDetailInfo = res.result
        this.imgList.push(res.result.mainPicPath)
      })
    }
  }
}
</script>
