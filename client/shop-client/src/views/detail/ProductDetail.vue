<template>
  <div>
    <header-tmpl></header-tmpl>
    <nav-bar></nav-bar>
    <bread-crumb></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <!-- Product main img -->
          <product-slide-img></product-slide-img>
          <!-- Product details -->
          <product-detail-desc></product-detail-desc>
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

export default {
  data () {
    return {
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
  }
}
</script>
