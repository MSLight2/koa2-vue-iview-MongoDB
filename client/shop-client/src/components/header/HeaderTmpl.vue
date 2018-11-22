<template>
  <header>
    <top-header :data-info="userInfoData"></top-header>
    <div id="header">
      <!-- container -->
      <div class="container">
        <div class="row">
          <!-- LOGO -->
          <div class="col-md-3">
            <div class="header-logo" title="首页">
              <a href="javascript:;" class="logo" @click="goHome">
                <img src="@/assets/img/logo.png" alt="">
              </a>
            </div>
          </div>
          <!-- SEARCH BAR -->
          <div class="col-md-6">
            <div class="header-search">
              <form @submit.prevent>
                <select class="input-select" v-model="categotySelect" @change="selectChange">
                  <option
                    v-for="(item, index) in categotyList"
                    :key="index"
                    :value="index"
                    >{{item}}
                  </option>
                </select>
                <input v-model="searchContent" class="input" placeholder="请输入要搜索的商品">
                <button class="search-btn" @click="search">搜索</button>
              </form>
            </div>
          </div>
          <!-- ACCOUNT -->
          <div class="col-md-3 clearfix">
            <div class="header-ctn">
              <!-- Wishlist -->
              <div>
                <a  @click="gotoCollectionPage">
                  <i class="fa fa-heart-o"></i>
                  <span>收藏</span>
                  <div class="qty" v-if="collectionCountGetter > 0">{{collectionCountGetter}}</div>
                </a>
              </div>
              <!-- /Wishlist -->
              <!-- Cart -->
              <div class="dropdown open">
                <a class="dropdown-toggle" @click="switchCart">
                  <i class="fa fa-shopping-cart"></i>
                  <span>购物车</span>
                  <div class="qty" v-if="cartCountGetter > 0">{{cartCountGetter}}</div>
                </a>
                <transition name="slide-fade">
                  <div class="cart-dropdown" v-show="cartListShow">
                    <template v-if="cartDataList.length > 0">
                      <div class="cart-list">
                        <div class="product-widget" v-for="(item, index) in cartDataList" :key="index">
                          <div class="product-img">
                            <img v-lazy="item.goodsId_docs[0].mainPicPath" alt="">
                          </div>
                          <div class="product-body">
                            <h3 class="product-name">{{item.goodsId_docs[0].title}}</h3>
                            <h4 class="product-price"><span class="qty">{{item.number}}x</span>￥{{item.goodsId_docs[0].showPrice | formatPrice}}</h4>
                          </div>
                          <button
                            v-if="$route.name !== 'cart'"
                            class="delete"
                            @click="deleteCart(item.goodsId)">
                              <i class="fa fa-close"></i>
                          </button>
                        </div>
                      </div>
                      <div class="cart-summary">
                        <small>选择商品个数（{{cartDataList.length}}）</small>
                        <h5>总金额: ￥{{totalPrice}}</h5>
                      </div>
                      <div class="cart-btns">
                        <a href="javascript:;" @click="checkCart">查看购物车</a>
                        <a href="javascript:;" @click="buyNow">立即购买  <i class="fa fa-arrow-circle-right"></i></a>
                      </div>
                    </template>
                    <!-- empty cart -->
                    <div class="cart-list" v-else>
                      <div class="empty-icon"><i class="login-icon iconfont icon-gouwuche"></i></div>
                      <p class="empty-txt">购物车什么都没有~</p>
                    </div>
                    <Spin size="large" fix v-if="loading"></Spin>
                  </div>
                </transition>
              </div>
              <!-- /Cart -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TopHeader from './TopHeader'
import LoginStorage from '@/utils/login'
import * as LoginApi from '@/api/login'
import * as CartApi from '@/api/cart'
import * as OrderApi from '@/api/order'

export default {
  data () {
    return {
      loading: false,
      categotyList: ['所有类目', '电脑', '智能手机', '耳机', '相机', '家电', 'AI智能'],
      categotySelect: 0,
      searchContent: '',
      cartListShow: false,
      userInfoData: {},
      cartDataList: []
    }
  },
  components: {
    TopHeader
  },
  mounted () {
    this.getUserInfoData()
    this.getCountAction()
  },
  computed: {
    ...mapGetters({
      collectionCountGetter: 'getCollectionCount',
      cartCountGetter: 'getCartCount'
    }),
    totalPrice () {
      let total = 0
      this.cartDataList.forEach((item, index) => {
        total += Number(item.goodsId_docs[0].showPrice) * item.number
      })
      if (!total) return '0.00'
      return total.toFixed(2)
    }
  },
  methods: {
    ...mapActions([
      'getCountAction'
    ]),
    // 获取登录用户的信息数据
    getUserInfoData () {
      if (!LoginStorage.getToken()) {
        return
      }
      LoginApi.getUserInfo().then(res => {
        this.userInfoData = res.result.dataInfo
      }).catch(() => {
        this.userInfoData = {}
      })
    },
    // 获取购物车列表
    getCartListInfo () {
      this.loading = true
      CartApi.GetCartList().then(res => {
        this.loading = false
        this.cartDataList = res.result
      }).catch(() => {
        this.loading = false
      })
    },
    // 删除购物车
    deleteCart (id) {
      this.loading = true
      CartApi.DeleteCart({ goodsId: id }).then(res => {
        this.loading = false
        this.getCartListInfo()
        this.getCountAction()
      }).catch(err => {
        this.loading = false
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器休息中，请稍后重试')
        }
      })
    },
    goHome () {
      this.cartListShow = false
      this.$router.replace({ name: 'home' })
    },
    selectChange () {
    },
    // 查询
    search () {
      if (!this.searchContent) return
      this.cartListShow = false
      this.$emit('search', this.searchContent, this.categotySelect)
    },
    // 显示购物车列表
    switchCart () {
      if (!LoginStorage.getToken()) {
        this.$Message.warning('请登录后在试')
        return
      }
      this.cartListShow = !this.cartListShow
      if (this.cartListShow) {
        // 获取购物车列表
        this.getCartListInfo()
      }
    },
    // 进入收藏页
    gotoCollectionPage () {
      this.cartListShow = false
      this.$router.replace({ name: 'collection' })
    },
    // 查看购物车
    checkCart () {
      this.cartListShow = false
      this.$router.replace({ name: 'cart' })
    },
    // 立即购买
    buyNow () {
      if (this.cartDataList.length <= 0) {
        this.cartListShow = false
        this.$Message.warning('购物车没有商品，请添加后再来吧~')
        return
      }
      let postArr = []
      this.cartDataList.forEach((item, index) => {
        let postItem = {
          goodsId: '',
          goodsNum: 0
        }
        postItem.goodsId = item.goodsId
        postItem.goodsNum = item.number
        postArr.push(postItem)
      })
      this.loading = true
      OrderApi.AddCheckout({ goodsCartList: JSON.stringify(postArr) }).then(res => {
        this.loading = false
        if (res.isSuccess) {
          this.cartListShow = false
          this.getCountAction()
          this.$router.replace({ name: 'checkout' })
        } else {
          this.$Message.warning(res.errMsg)
        }
      }).catch(err => {
        this.loading = false
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器不想理你，请稍后重试')
        }
      })
    }
  }
}
</script>

<style>
  .header-search form .input-select,
  .header-search form .search-btn{
    vertical-align: top;
  }
  .cart-dropdown{
    top: 40px;
    box-shadow: 0px 0px 6px 0px #E4E7ED;
    border-radius: 3px;
  }
  .cart-dropdown .cart-list{
    text-align: center;
  }
  .cart-dropdown .cart-btns{
    margin: 0 0;
    display: flex;
    justify-content: space-around;
  }
  .cart-dropdown .cart-btns>a{
    border-radius: 18px;
    width: calc(50% - 15px)
  }
  .cart-dropdown .cart-btns>a:first-child{
    margin-right: 0;
  }
  .cart-dropdown .product-name{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .cart-dropdown .product-widget{
    margin: 10px 0;
  }
  .cart-dropdown .product-widget .delete{
    background: #D10024;
    right: -15px;
    left: initial;
  }
</style>
