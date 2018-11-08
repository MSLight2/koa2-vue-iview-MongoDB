<template>
  <div>
    <header-tmpl></header-tmpl>
    <nav-bar></nav-bar>
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
                  <div class="cli-img">
                    <div class="cli-img-img"><img src="@/assets/img/product01.png" alt=""/></div>
                    <p>苹果笔记本高配(32G 2T)</p>
                  </div>
                  <div class="cli-price">￥18999.00</div>
                  <div class="cli-qty">
                    <span class="qty-i">+</span>
                    <input type="tel" maxlength="5" name="qty" value="1">
                    <span class="qty-i">-</span>
                    <i class="iconfont icon-bu-error-circle"></i>
                  </div>
                  <div class="cli-total">￥22225.00</div>
                </div>
              </div>
              <!-- cart bottom -->
              <div class="cart-btm">
                <div class="cart-btm-price discount">
                  <p>已优惠</p>
                  <span>￥18999<i>.00</i></span>
                </div>
                <div class="cart-btm-price">
                  <p>总金额</p>
                  <span>￥22225<i>.39</i></span>
                </div>
                <button class="cart-btm-btn">立即购买</button>
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
import * as CartApi from '@/api/cart'
import LoginStorage from '@/utils/login'

export default {
  data () {
    return {
      breadCrumbTitles: {
        titleArr: ['首页', '我的', '购物车'],
        path: []
      },
      cartDataList: [],
      isEmpty: false
    }
  },
  components: {
    HeaderTmpl,
    NavBar,
    BreadCrumb,
    NewsLetter,
    FooterTmpl
  },
  mounted () {
    this.fetchData()
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
        console.log(res)
      }).catch((err) => {
        this.isEmpty = true
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器不想理你，请稍后重试')
        }
      })
    },
    goBuy () {
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>

<style scoped>
  .empty-cart button{
    width: 200px;
    height: 40px;
  }
  .empty-cart >>> .ivu-btn-primary{
    background-color: #D10024;
    border-color: #D10024;
  }
</style>
