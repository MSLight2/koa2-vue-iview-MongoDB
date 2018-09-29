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
            <!-- cart list-->
            <div class="cart-list" v-for="index in 2" :key="index">
              <div class="cart-list-item">
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
            <!-- cart bottom-->
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

export default {
  data () {
    return {
      breadCrumbTitles: {
        titleArr: ['首页', '我的', '购物车'],
        path: []
      }
    }
  },
  components: {
    HeaderTmpl,
    NavBar,
    BreadCrumb,
    NewsLetter,
    FooterTmpl
  },
  methods: {
  }
}
</script>
