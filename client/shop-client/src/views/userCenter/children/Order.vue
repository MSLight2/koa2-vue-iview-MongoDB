<template>
  <div>
    <h3 class="user-h3">全部订单</h3>
    <div class="order-user-box" v-if="!isEmpty && orderList.length > 0">
      <div class="order-user-item" v-for="(item, index) in orderList" :key="index">
        <div class="order-user-desc">
          <div class="img" v-lazy-container="{ selector: 'img' }">
            <img :data-src="item.goodsId_docs[0].mainPicPath | filterImgUrl" alt="">
          </div>
          <div class="detail">
            <p class="title">{{item.goodsId_docs[0].title}}</p>
            <div class="price">
              <strong>￥{{item.goodsId_docs[0].showPrice}}</strong>
              <del>￥{{item.goodsId_docs[0].discountPrice}}</del></div>
          </div>
        </div>
        <div class="order-user-other">
          <div class="ouo-item">订单号：{{item.orderNumber}}</div>
          <div class="ouo-item" v-if="item.payStatus === 2">支付时间：{{item.payTime | formatDate}}</div>
          <div class="ouo-item" v-else>生成订单时间：{{item.createTime | formatDate}}</div>
          <div class="ouo-item gopay-btn" v-if="item.payStatus === 0">
            <span class="pay-btn" @click="goPay">去支付</span>
          </div>
          <template v-else>
            <div
              class="ouo-item order-user-paytype"
              v-if="item.payStatus === 2"
              >支付方式：<strong class="t_primary">微信</strong>
              <div class="ouo-icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin" v-if="item.payType === 1"></use>
                  <use xlink:href="#icon-zhifupingtai-zhifubao" v-if="item.payType === 2"></use>
                  <use xlink:href="#icon-bankcard" v-if="item.payType === 3"></use>
                </svg>
              </div>
            </div>
            <div
              class="ouo-item"
              v-else
              >支付方式：<strong class="t_primary">{{item.payStatus | filterPayStatus}}</strong>
            </div>
          </template>
        </div>
        <div class="pay-type" v-if="item.payStatus === 0">未支付</div>
      </div>
    </div>
    <div class="usercenter-empty" v-else>
      <div class="empty-icon"><i class="login-icon iconfont icon-chazhaoxiangsi"></i></div>
      <p class="empty-txt">空空如也~</p>
      <Button type="primary" size="large" shape="circle" @click="goBuy">去 添 加</Button>
    </div>
    <div class="user-store-filter" v-if="orderList.length > 0">
      <ul class="store-pagination">
        <Page
          v-if="pageCount > 1"
          :current="currentPage"
          :page-size="pageSize"
          :total="pageTotal"
          @on-change="pageChange"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import * as OrderApi from '@/api/order'
import moment from 'moment'

export default {
  data () {
    return {
      isEmpty: false,
      orderList: [],
      // 分页
      currentPage: 1,
      pageSize: 6,
      pageCount: 1,
      pageTotal: 0
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.isEmpty = false
      OrderApi.GetAllOrders({
        page: this.currentPage,
        pageSize: 6
      }).then(res => {
        this.orderList = res.result
        this.currentPage = res.paginationModule.page
        this.pageSize = res.paginationModule.pageSize
        this.pageCount = res.paginationModule.pageCount
        this.pageTotal = res.paginationModule.total
      }).catch(err => {
        this.isEmpty = true
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器休息中，请稍后重试')
        }
      })
    },
    pageChange (page) {
      this.currentPage = page
      this.fetchData()
    },
    goPay () {
      this.$router.push({ name: 'checkout' })
    },
    goBuy () {
      this.$router.replace({ name: 'home' })
    }
  },
  filters: {
    filterImgUrl (val) {
      if (val) {
        return val.replace(/_60x60.jpg/g, '_180x180.jpg')
      } else {
        return '--'
      }
    },
    formatDate (val) {
      if (val) {
        return moment(parseInt(val)).format('YYYY-MM-DD HH:mm')
      } else {
        return '无'
      }
    },
    filterPayStatus (val) {
      switch (val) {
        case 0:
          return '未支付'
        case 1:
          return '转账中'
        case 2:
          return '已支付'
        case 4:
          return '退款中'
        case 5:
          return '已退款'
        default:
          return '无支付状态'
      }
    }
  }
}
</script>
