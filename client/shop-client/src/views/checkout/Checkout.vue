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
      orderDetailDataList: [],
      goodsId: null
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
    this.goodsId = this.$route.query.goodsId || ''
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
      let params = { goodsId: this.goodsId }
      OrderApi.GetCheckoutList(params).then(res => {
        if (res.isSuccess) {
          this.orderDetailDataList = res.result || []
        } else {
          this.$Message.error(res.errMsg)
        }
      })
    },
    // 支付前检验
    beforePay () {
      if (this.addressData.length <= 0) {
        this.$Modal.confirm({
          title: '提示',
          okText: '知道了',
          content: '你还没有添加收货地址，请在右方添加收货地址'
        })
        return false
      }
      return true
    },
    // 立即支付
    payNow (typePick, totalPrice) {
      if (!this.beforePay()) return
      let goodsIdArr = this.orderDetailDataList.map(item => { return item.goodsId })
      let propsData = {
        goodsIdList: JSON.stringify(goodsIdArr),
        payType: parseInt(typePick) || null,
        payPrice: totalPrice
      }
      OrderApi.EditPayCheckout(propsData).then(res => {
        if (res.isSuccess) {
          // 支付成功页面
          this.$router.replace({
            name: 'success',
            query: {
              type: typePick,
              price: totalPrice,
              time: new Date().getTime(),
              payNumber: new Date().getTime() * Math.random().toFixed(1) * 10
            }
          })
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
