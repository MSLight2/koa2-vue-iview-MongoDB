<template>
  <div>
    <header-tmpl></header-tmpl>
    <nav-bar></nav-bar>
    <bread-crumb :titles="breadCrumbTitles"></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <!-- Billing Details -->
          <billing-address></billing-address>
          <!-- Order Details -->
          <order-details :data="orderDetailData" @payNow="payNow"></order-details>
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
import OrderDetails from './children/OrderDetails'
import BillingAddress from './children/BillingAddress'

export default {
  data () {
    return {
      breadCrumbTitles: {
        titleTip: '支付',
        titleArr: ['首页', '确认支付'],
        path: []
      },
      orderDetailData: {}
    }
  },
  components: {
    HeaderTmpl,
    NavBar,
    BreadCrumb,
    NewsLetter,
    FooterTmpl,
    OrderDetails,
    BillingAddress
  },
  mounted () {
  },
  methods: {
    payNow (typePick, userIsAgren) {
    }
  }
}
</script>
