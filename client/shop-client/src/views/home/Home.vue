<template>
  <div>
    <header-tmpl></header-tmpl>
    <nav-bar></nav-bar>
    <section-shop></section-shop>
    <section-slide></section-slide>
    <hot-detail></hot-detail>
    <section-slide></section-slide>
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

export default {
  data () {
    return {
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
  }
}
</script>

<style>
  body{
    line-height: inherit;
  }
</style>
