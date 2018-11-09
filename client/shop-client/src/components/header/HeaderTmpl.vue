<template>
  <header>
    <top-header :data-info="userInfoData"></top-header>
    <div id="header">
      <!-- container -->
      <div class="container">
        <div class="row">
          <!-- LOGO -->
          <div class="col-md-3">
            <div class="header-logo">
              <a href="javascript:;" class="logo" @click="goHome">
                <img src="@/assets/img/logo.png" alt="">
              </a>
            </div>
          </div>
          <!-- SEARCH BAR -->
          <div class="col-md-6">
            <div class="header-search">
              <form @click="forbitSubmit($event)">
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
                <a href="javascript:;">
                  <i class="fa fa-heart-o"></i>
                  <span>收藏</span>
                  <div class="qty">2</div>
                </a>
              </div>
              <!-- /Wishlist -->
              <!-- Cart -->
              <div class="dropdown open">
                <a class="dropdown-toggle" @click="switchCart">
                  <i class="fa fa-shopping-cart"></i>
                  <span>购物车</span>
                  <div class="qty">3</div>
                </a>
                <div class="cart-dropdown" v-show="cartListShow">
                  <div class="cart-list">
                    <div class="product-widget">
                      <div class="product-img">
                        <img src="" alt="">
                      </div>
                      <div class="product-body">
                        <h3 class="product-name"><a href="#">product name goes here</a></h3>
                        <h4 class="product-price"><span class="qty">1x</span>$980.00</h4>
                      </div>
                      <button class="delete"><i class="fa fa-close"></i></button>
                    </div>
                    <div class="product-widget">
                      <div class="product-img">
                        <img src="" alt="">
                      </div>
                      <div class="product-body">
                        <h3 class="product-name"><a href="#">product name goes here</a></h3>
                        <h4 class="product-price"><span class="qty">3x</span>$980.00</h4>
                      </div>
                      <button class="delete"><i class="fa fa-close"></i></button>
                    </div>
                  </div>
                  <div class="cart-summary">
                    <small>选择商品个数（3）</small>
                    <h5>SUBTOTAL: $2940.00</h5>
                  </div>
                  <div class="cart-btns">
                    <a href="javascript:;" @click="checkCart">查看购物车</a>
                    <a href="javascript:;" @click="buyNow">立即购买  <i class="fa fa-arrow-circle-right"></i></a>
                  </div>
                </div>
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
import TopHeader from './TopHeader'
export default {
  data () {
    return {
      categotyList: ['所有类目', '电脑', '智能手机', '耳机', '相机', '家电', 'AI智能'],
      categotySelect: 0,
      searchContent: '',
      cartListShow: false
    }
  },
  components: {
    TopHeader
  },
  props: {
    userInfoData: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  methods: {
    goHome () {
      this.$router.replace({ name: 'home' })
    },
    selectChange () {
    },
    search () {
      if (!this.searchContent) return
      this.$emit('search', this.searchContent, this.categotySelect)
    },
    switchCart () {
      this.cartListShow = !this.cartListShow
    },
    checkCart () {
      this.$router.replace({ name: 'cart' })
    },
    buyNow () {
      this.$router.replace({ name: 'checkout' })
    },
    forbitSubmit (e) {
      e.preventDefault()
    }
  }
}
</script>

<style>
  .header-search form .input-select,
  .header-search form .search-btn{
    vertical-align: top;
  }
</style>
