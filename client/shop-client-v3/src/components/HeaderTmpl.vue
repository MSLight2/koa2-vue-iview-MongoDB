<template>
  <header>
    <top-header :data-info="userStore.getUserInfoData"></top-header>
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
                <select class="input-select" v-model="state.categotySelect">
                  <option
                    v-for="(item, index) in categotyList"
                    :key="index"
                    :value="index"
                    >{{item}}
                  </option>
                </select>
                <input
                  v-model="state.searchContent"
                  maxlength="30"
                  class="input"
                  placeholder="请输入要搜索的商品"
                >
                <button class="search-btn" @click="search">搜索</button>
              </form>
            </div>
          </div>
          <!-- ACCOUNT -->
          <div class="col-md-3 clearfix">
            <div class="header-ctn">
              <!-- user center -->
              <div>
                <a @click="goUserCenter">
                  <i class="iconfont icon-user"></i>
                  <span>个人中心</span>
                </a>
              </div>
              <!-- Wishlist -->
              <div>
                <a @click="gotoCollectionPage">
                  <i class="fa fa-heart-o"></i>
                  <span>收藏</span>
                  <div class="qty" v-if="userStore.getCollectionCount > 0">{{userStore.getCollectionCount}}</div>
                </a>
              </div>
              <!-- Cart -->
              <div class="dropdown open">
                <a class="dropdown-toggle" @click="switchCart">
                  <i class="fa fa-shopping-cart"></i>
                  <span>购物车</span>
                  <div class="qty" v-if="userStore.getCartCount > 0">{{userStore.getCartCount}}</div>
                </a>
                <transition name="slide-fade">
                  <div class="cart-dropdown" v-show="state.cartListShow">
                    <template v-if="state.cartDataList.length > 0">
                      <div class="cart-list">
                        <div class="product-widget" v-for="(item, index) in state.cartDataList" :key="index">
                          <div class="product-img">
                            <img v-lazy="item.goodsId_docs[0].mainPicPath" alt="">
                          </div>
                          <div class="product-body">
                            <h3 class="product-name">{{item.goodsId_docs[0].title}}</h3>
                            <h4 class="product-price"><span class="qty">{{item.number}}x</span>￥{{formatPrice(item.goodsId_docs[0].showPrice)}}</h4>
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
                        <small>选择商品个数（{{state.cartDataList.length}}）</small>
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
                    <Spin size="large" fix v-if="state.loading"></Spin>
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

<script setup lang="ts">
import { computed, shallowReactive } from 'vue';
import { useUserStore } from '@/stores/user';
import TopHeader from './TopHeader.vue';
import LoginStorage from '@/utils/login';
import * as CartApi from '@/api/cart';
import * as OrderApi from '@/api/order';
import { Message } from 'view-ui-plus';
import { useRoute, useRouter } from 'vue-router';
import { formatPrice } from '@/utils/utils'

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const categotyList = ['所有类目', '电脑', '智能手机', '耳机', '相机', '家电', 'AI智能'];
const state = shallowReactive({
  loading: false,
  categotySelect: 0,
  searchContent: '',
  cartListShow: false,
  cartDataList: <any[]>[]
});

const totalPrice = computed(() => {
  let total = 0;
  state.cartDataList.forEach((item: any) => {
    total += Number(item.goodsId_docs[0].showPrice) * item.number
  })
  if (!total) return '0.00';
  return total.toFixed(2);
});

// 获取购物车列表
function getCartListInfo () {
  state.loading = true
  CartApi.GetCartList().then((res: any) => {
    state.loading = false
    state.cartDataList = res.result
    if (state.cartDataList.length <= 0) {
      userStore.cartCount = 0;
      setTimeout(() => {
        state.cartListShow = false
      }, 1500)
    }
  }).catch((err) => {
    state.loading = false
    if (err.code >= 1000 && err.code <= 1002) {
      Message.error('登录过期，请重新登录')
    } else {
      Message.error('服务器休息中，请稍后重试')
    }
    setTimeout(() => {
      state.cartListShow = false
    }, 1500);
  })
}

// 删除购物车
function deleteCart (id: number) {
  state.loading = true
  CartApi.DeleteCart({ goodsId: id }).then(res => {
    state.loading = false
    getCartListInfo()
    userStore.getCountAction()
  }).catch(err => {
    state.loading = false
    if (err.code >= 1000 && err.code <= 1002) {
      Message.error('登录过期，请重新登录')
    } else {
      Message.error('服务器休息中，请稍后重试')
    }
  })
}

function goHome () {
  state.cartListShow = false
  router.replace({ name: 'home' })
}
// 查询
function search () {
  if (!state.searchContent) return
  state.cartListShow = false
  if (route.name === 'store') {
    router.replace({
      name: 'store',
      query: {
        type: state.categotySelect,
        keywords: state.searchContent
      }
    })
  } else {
    router.push({
      name: 'store',
      query: {
        type: state.categotySelect,
        keywords: state.searchContent
      }
    }).then(() => {
      state.categotySelect = 0
      state.searchContent = ''
    })
  }
}
// 显示购物车列表
function switchCart () {
  if (!LoginStorage.getToken()) {
    Message.warning('你还没登录，请登录')
    return
  }
  state.cartListShow = !state.cartListShow
  if (state.cartListShow) {
    // 获取购物车列表
    getCartListInfo()
  }
}
// 进入个人中心
function goUserCenter () {
  if (!LoginStorage.getToken()) {
    Message.warning('你还没登录，请登录')
    return
  }
  router.push({
    name: 'userCenter',
    query: {
      name: 'userMsg'
    }
  })
}
// 进入收藏页
function gotoCollectionPage () {
  if (!LoginStorage.getToken()) {
    Message.warning('你还没登录，请登录')
    return
  }
  state.cartListShow = false
  router.replace({ name: 'collection' })
}
// 查看购物车
function checkCart () {
  state.cartListShow = false
  router.replace({ name: 'cart' })
}
// 立即购买
function buyNow () {
  if (state.cartDataList.length <= 0) {
    state.cartListShow = false
    Message.warning('购物车没有商品，请添加后再来吧~')
    return
  }
  let postArr: any[] = [];
  state.cartDataList.forEach((item: any, index) => {
    let postItem = {
      goodsId: '',
      goodsNum: 0
    }
    postItem.goodsId = item.goodsId
    postItem.goodsNum = item.number
    postArr.push(postItem)
  })
  state.loading = true
  OrderApi.AddCheckout({ goodsCartList: JSON.stringify(postArr) }).then((res: any) => {
    state.loading = false
    if (res.isSuccess) {
      state.cartListShow = false
      userStore.getCountAction()
      router.replace({ name: 'checkout' })
    } else {
      Message.warning(res.errMsg)
    }
  }).catch(err => {
    state.loading = false
    if (err.code >= 1000 && err.code <= 1002) {
      Message.error('登录过期，请重新登录')
    } else {
      Message.error('服务器不想理你，请稍后重试')
    }
  })
}
</script>

<style scoped lang="less">
  .header-search form .input-select,
  .header-search form .search-btn{
    vertical-align: top;
  }
  .cart-dropdown{
    top: 40px;
    box-shadow: 0px 0px 6px 0px #E4E7ED;
    border-radius: 3px;
    .cart-list{
      text-align: center;
    }
    .cart-btns{
      margin: 0 0;
      display: flex;
      justify-content: space-around;
    }
    .cart-btns>a{
      border-radius: 18px;
      width: calc(50% - 15px);
      &:first-child{
        margin-right: 0;
      }
    }
    .product-name{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .product-widget{
      margin: 10px 0;
      .delete{
        background: #D10024;
        right: -15px;
        left: initial;
      }
    }
  }
</style>