<template>
  <div>
    <header-tmpl></header-tmpl>
    <nav-bar></nav-bar>
    <bread-crumb :titles="breadCrumbTitles"></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <!-- ASIDE -->
          <store-aside></store-aside>
          <!-- STORE -->
          <store-list></store-list>
          </div>
        </div>
      </div>
    <news-letter></news-letter>
    <footer-tmpl></footer-tmpl>
  </div>
</template>

<script>
import HeaderTmpl from '@/components/header/HeaderTmpl'
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import NewsLetter from '@/components/puppetComponent/NewsLetter'
import BreadCrumb from '@/components/puppetComponent/BreadCrumb'
import StoreAside from './children/StoreAside'
import StoreList from './children/StoreList'

export default {
  data () {
    return {
      breadCrumbTitles: {
        titleArr: ['首页', '笔记本', '电脑'],
        path: []
      }
    }
  },
  components: {
    HeaderTmpl,
    NavBar,
    BreadCrumb,
    NewsLetter,
    FooterTmpl,
    StoreAside,
    StoreList
  },
  mounted () {
  },
  methods: {
  }
}
</script>
