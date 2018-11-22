<template>
  <div>
    <bread-crumb :titles="breadCrumbTitles"></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="cart-main">
            <div class="cart-title">
              <div class="title-s">商品</div>
              <div class="title-p">价格</div>
              <div class="title-c">数量</div>
              <div class="title-m">金额</div>
            </div>
            <template v-if="!isEmpty && cartDataList.length > 0">
              <!-- cart list -->
              <div class="cart-list">
                <div class="cart-list-item" v-for="(item, index) in cartDataList" :key="index">
                  <div class="cli-img" @click="checkDetail(item.goodsId)">
                    <div class="cli-img-img">
                      <img :src="item.goodsId_docs[0].mainPicPath | filterImgUrl" alt=""/>
                    </div>
                    <p>{{item.goodsId_docs[0].title}}</p>
                  </div>
                  <div class="cli-price">￥{{item.goodsId_docs[0].showPrice | formatPrice}}</div>
                  <div class="cli-qty">
                    <span class="qty-i" @click="incCount(index)">+</span>
                    <input
                      type="tel"
                      maxlength="5"
                      name="qty"
                      value="1"
                      @blur="countChange(index)"
                      @change="countChange(index)"
                      v-model="cartCount[index].count">
                    <span class="qty-i" @click="decCount(index)">-</span>
                    <i class="iconfont icon-bu-error-circle" @click="deleteCart(index)"></i>
                  </div>
                  <div class="cli-total">￥{{(item.goodsId_docs[0].showPrice * item.number) | formatPrice}}</div>
                </div>
              </div>
              <!-- cart bottom -->
              <div class="cart-btm">
                <div class="cart-btm-price discount">
                  <p>已优惠</p>
                  <span>￥0<i>.00</i></span>
                </div>
                <div class="cart-btm-price">
                  <p>总金额</p>
                  <span>￥{{totalPrice[0] || 0}}<i>.{{totalPrice[1] || '00'}}</i></span>
                </div>
                <Button
                  class="cart-btm-btn"
                  type="primary"
                  size="large"
                  shape="circle"
                  :loading="submitLoading"
                  @click="goCheckout">立即购买
                </Button>
              </div>
            </template>
            <template v-else>
              <!-- empty cart -->
              <div class="empty-cart">
                <div class="empty-icon"><i class="login-icon iconfont icon-gouwuche"></i></div>
                <p class="empty-txt">购物车什么都没有~</p>
                <Button type="primary" size="large" shape="circle" @click="goBuy">去 添 加</Button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <footer-tmpl></footer-tmpl>
    <iview-modal
      :is-show="modalShow"
      type="warning"
      content="亲！确定要删除吗？o(╥﹏╥)o"
      sureText="是的"
      :isShowCancel="true"
      @close="modaClose">
    </iview-modal>
  </div>
</template>

<script>
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import NewsLetter from '@/components/puppetComponent/NewsLetter'
import BreadCrumb from '@/components/puppetComponent/BreadCrumb'
import IviewModal from '@/components/puppetComponent/Modal/IviewModal'
import * as CartApi from '@/api/cart'
import * as OrderApi from '@/api/order'
import LoginStorage from '@/utils/login'

export default {
  data () {
    return {
      modalShow: false,
      breadCrumbTitles: {
        titleArr: ['首页', '我的', '购物车'],
        path: []
      },
      cartDataList: [],
      isEmpty: false,
      cartCount: [
        { count: 1 }
      ],
      goodsId: '',
      submitLoading: false
    }
  },
  components: {
    NavBar,
    BreadCrumb,
    NewsLetter,
    FooterTmpl,
    IviewModal
  },
  mounted () {
    this.fetchData()
  },
  computed: {
    totalPrice () {
      let total = 0
      this.cartDataList.forEach((item, index) => {
        total += Number(item.goodsId_docs[0].showPrice) * item.number
      })
      if (!total) return '0.00'
      total = total.toFixed(2).toString()
      return total.split('.')
    }
  },
  methods: {
    fetchData () {
      if (!LoginStorage.getToken()) {
        this.isEmpty = true
        return
      }
      this.isEmpty = false
      CartApi.GetCartList().then(res => {
        this.cartDataList = res.result
        this.cartCount = []
        this.cartDataList.forEach(item => {
          this.cartCount.push({ count: item.number })
        })
      }).catch((err) => {
        this.isEmpty = true
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器休息中，请稍后重试')
        }
      })
    },
    // 去添加
    goBuy () {
      this.$router.replace({ name: 'home' })
    },
    // 查看详情
    checkDetail (id) {
      window.open(`/detail?id=${id}`)
    },
    incCount (index) {
      this.cartCount[index].count += 1
      if (this.cartCount[index].count > 9999) {
        this.cartCount[index].count = 9999
      }
    },
    decCount (index) {
      this.cartCount[index].count -= 1
      if (this.cartCount[index].count <= 1) {
        this.cartCount[index].count = 1
      }
    },
    countChange (index) {
      if (this.cartCount[index].count <= 1) this.cartCount[index].count = 1
      if (this.cartCount[index].count > 9999) this.cartCount[index].count = 9999
    },
    // 删除购物车
    deleteCart (index) {
      if (!LoginStorage.getToken()) {
        this.$Message.error('请登录后在试！')
        return
      }
      this.modalShow = true
      this.goodsId = this.cartDataList[index].goodsId
    },
    // 确定删除
    modaClose (val) {
      this.modalShow = false
      if (val === 'confirm') {
        CartApi.DeleteCart({ goodsId: this.goodsId }).then(res => {
          this.$Message.success('已删除')
          this.$store.dispatch('getCountAction')
          this.fetchData()
        }).catch(err => {
          if (err.code >= 1000 & err.code <= 1002) {
            this.$Message.error('登录过期，请重新登录')
          } else {
            this.$Message.error('服务器休息中，请稍后重试')
          }
        })
      }
    },
    // 立即购买
    goCheckout () {
      // 生成订单-跳转
      if (!LoginStorage.getToken()) {
        this.$Message.error('请登录后在试！')
        return
      }
      let postArr = []
      this.cartDataList.forEach((item, index) => {
        let postItem = {
          goodsId: '',
          goodsNum: 0
        }
        postItem.goodsId = item.goodsId
        postItem.goodsNum = this.cartCount[index].count
        postArr.push(postItem)
      })
      this.submitLoading = true
      OrderApi.AddCheckout({ goodsCartList: JSON.stringify(postArr) }).then(res => {
        this.submitLoading = false
        if (res.isSuccess) {
          this.$store.dispatch('getCountAction')
          this.$router.push({ name: 'checkout' })
        } else {
          this.$Message.warning(res.errMsg)
        }
      }).catch(err => {
        this.submitLoading = false
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器不想理你，请稍后重试')
        }
      })
    }
  },
  filters: {
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
  .empty-cart button{
    width: 200px;
    height: 40px;
  }
  .empty-cart >>> .ivu-btn-primary,
  .cart-btm-btn.ivu-btn-primary{
    background-color: #D10024;
    border-color: #D10024;
    border: none;
    box-shadow: none;
  }
</style>
