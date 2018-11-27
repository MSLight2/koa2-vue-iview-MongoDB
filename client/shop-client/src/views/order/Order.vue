<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="o-order-title">
          <div class="g-detail">商品信息</div>
          <div class="g-price">实际付款</div>
          <div class="g-type">付款方式</div>
          <div class="g-status">状态</div>
        </div>
        <div class="order-content" v-if="dataList.length > 0">
          <div class="order-items" v-for="(item, index) in dataList" :key="index">
            <div class="order-cnt-top">
              <span>订单号：{{item.orderNumber}}</span>
              <span class="order-time">下单时间：{{item.payTime | formatTime}}</span>
            </div>
            <div class="order-cnt-desc">
              <div class="ocd-img">
                <img :src="item.goodsId_docs[0].mainPicPath | filterImgUrl" alt="" />
                <div class="ocd-img-desc">
                  <p>{{item.goodsId_docs[0].title}}</p>
                  <p class="price">单价：￥{{item.goodsId_docs[0].showPrice | formatPrice}}</p>
                </div>
                <p>x{{item.goodsNum}}</p>
              </div>
              <div class="ocd-price">
                <p>￥{{item.payPrice | formatPrice}}</p>
                <p>【免运费】</p>
              </div>
              <div class="ocd-paytype">
                <svg class="icon" aria-hidden="true" v-if="item.payType">
                  <use xlink:href="#icon-weixin" v-if="item.payType === 1"></use>
                  <use xlink:href="#icon-zhifupingtai-zhifubao" v-if="item.payType === 2"></use>
                  <use xlink:href="#icon-bankcard" v-if="item.payType === 3"></use>
                </svg>
                <span>{{item.payType | filterPayType}}</span>
              </div>
              <div class="ocd-status">{{item.tradeStatus | filterStatus}}</div>
            </div>
          </div>
        </div>
        <!-- empty cart -->
        <div class="empty-order" v-else>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dingdan"></use>
            </svg>
          </div>
          <p class="empty-txt">您还没有订单哟~</p>
        </div>
      </div>
    </div>
    <footer-tmpl></footer-tmpl>
  </div>
</template>

<script>
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import * as OrderApi from '@/api/order'
import LoginStorage from '@/utils/login'
import moment from 'moment'

export default {
  data () {
    return {
      dataList: []
    }
  },
  components: {
    FooterTmpl
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      if (!LoginStorage.getToken()) {
        this.$Message.error('你还未请登录，请登录后在试')
        return
      }
      OrderApi.GetPayCheckoutList().then(res => {
        if (res.isSuccess) {
          this.dataList = res.result
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
    }
  },
  filters: {
    formatTime (val) {
      if (val) {
        return moment(parseInt(val)).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return '----'
      }
    },
    filterPayType (val) {
      switch (val) {
        case 1:
          return '微信'
        case 2:
          return '支付宝'
        case 3:
          return '网银'
        default:
          return '无'
      }
    },
    filterStatus (val) {
      switch (val) {
        case 0:
          return '待发货'
        case 1:
          return '已发货'
        case 2:
          return '已收货'
        default:
          return '无'
      }
    },
    filterImgUrl (val) {
      if (val) {
        return val.replace(/_60x60.jpg/g, '_120x120.jpg')
      } else {
        return '--'
      }
    }
  }
}
</script>

<style scoped>
  .empty-order{
    text-align: center;
    margin: 120px 0;
  }
</style>
