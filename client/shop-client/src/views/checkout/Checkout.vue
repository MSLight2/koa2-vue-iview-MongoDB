<template>
  <div>
    <bread-crumb :titles="breadCrumbTitles"></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <!-- Billing Details -->
          <billing-address
            :address-list="addressData"
            @reload="fetchAddress">
          </billing-address>
          <!-- Order Details -->
          <order-details
            :data-list="orderDetailDataList"
            @payNow="payNow">
          </order-details>
        </div>
      </div>
    </div>
    <footer-tmpl></footer-tmpl>
  </div>
</template>

<script>
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import NewsLetter from '@/components/puppetComponent/NewsLetter'
import BreadCrumb from '@/components/puppetComponent/BreadCrumb'
import OrderDetails from './children/OrderDetails'
import BillingAddress from './children/BillingAddress'
import * as OrderApi from '@/api/order'
import * as AddressApi from '@/api/address'
import LoginStorage from '@/utils/login'

export default {
  data () {
    return {
      breadCrumbTitles: {
        titleTip: '支付',
        titleArr: ['首页', '确认支付'],
        path: []
      },
      addressData: [],
      orderDetailDataList: []
    }
  },
  components: {
    NavBar,
    BreadCrumb,
    NewsLetter,
    FooterTmpl,
    OrderDetails,
    BillingAddress
  },
  mounted () {
    this.fetchAddress()
    this.fetchOrder()
  },
  methods: {
    // 获取地址
    fetchAddress () {
      if (!LoginStorage.getToken()) {
        this.$Message.error('你还未请登录，请登录后在试')
        return
      }
      AddressApi.GetAddress({ isDefault: true }).then(res => {
        if (res.isSuccess) {
          this.addressData = res.result
        } else {
          this.$Message.error(res.errMsg)
        }
      }).catch(err => {
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器休息中，请稍后重试')
        }
      })
    },
    // 获取订单列表
    fetchOrder () {
      OrderApi.GetCheckoutList().then(res => {
        this.orderDetailDataList = res.result || []
        if (res.isSuccess) {
        } else {
          this.$Message.error(res.errMsg)
        }
      })
    },
    // 立即支付
    payNow (typePick, totalPrice) {
      let goodsIdArr = this.orderDetailDataList.map(item => { return item.goodsId })
      let propsData = {
        goodsIdList: JSON.stringify(goodsIdArr),
        payPrice: totalPrice
      }
      OrderApi.EditPayCheckout(propsData).then(res => {
        if (res.isSuccess) {
          console.log(res)
        } else {
          this.$Message.warning(res.errMsg)
        }
      })
    }
  }
}
</script>

<style>
   .ck-checkbox{
     top: -1px !important;
   }
</style>
