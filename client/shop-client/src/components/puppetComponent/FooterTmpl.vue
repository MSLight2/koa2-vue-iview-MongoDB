<template>
  <footer id="footer">
    <!-- top footer -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-xs-6">
            <div class="footer">
              <h3 class="footer-title">关于我</h3>
              <p style="margin: 10px 0;">早起的虫儿被鸟吃.</p>
              <ul class="footer-links">
                <li><a href="javascript:;"><i class="fa fa-map-marker"></i>广东省广州市</a></li>
                <li><a href="javascript:;"><i class="fa fa-phone"></i>135XXXXXXXX</a></li>
                <li><a href="javascript:;"><i class="fa fa-envelope-o"></i>1841978799@qq.com</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-3 col-xs-6">
            <div class="footer">
              <h3 class="footer-title">类目</h3>
              <ul class="footer-links">
                <li><a href="javascript:;" @click="gotoStore(1)">电脑</a></li>
                <li><a href="javascript:;" @click="gotoStore(2)">智能手机</a></li>
                <li><a href="javascript:;" @click="gotoStore(3)">耳机</a></li>
                <li><a href="javascript:;" @click="gotoStore(4)">相机</a></li>
                <li><a href="javascript:;" @click="gotoStore(5)">家电</a></li>
                <li><a href="javascript:;" @click="gotoStore(6)">AI智能</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-3 col-xs-6">
            <div class="footer">
              <h3 class="footer-title">咨询</h3>
              <ul class="footer-links">
                <li><a target="_blank" href="https://github.com/MSLight2">关于我</a></li>
                <li><a href="javascript:;">反馈</a></li>
                <li><a href="javascript:;">说明</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-3 col-xs-6">
            <div class="footer">
              <h3 class="footer-title">服务</h3>
              <ul class="footer-links">
                <li><a href="javascript:;" @click="goUserCenter">个人中心</a></li>
                <li><a href="javascript:;" @click="checkShopCar">查看购物车</a></li>
                <li><a href="javascript:;" @click="checkCollection">收藏</a></li>
                <li><a href="javascript:;">帮助</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- bottom footer -->
    <div id="bottom-footer" class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <ul class="footer-payments">
              <li><a href="#"><i class="fa fa-cc-visa"></i></a></li>
              <li><a href="#"><i class="fa fa-credit-card"></i></a></li>
              <li><a href="#"><i class="fa fa-cc-paypal"></i></a></li>
              <li><a href="#"><i class="fa fa-cc-mastercard"></i></a></li>
              <li><a href="#"><i class="fa fa-cc-discover"></i></a></li>
              <li><a href="#"><i class="fa fa-cc-amex"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import LoginStorage from '@/utils/login'
export default {
  data () {
    return {
    }
  },
  methods: {
    gotoStore (index) {
      window.open(`/store?type=${index}`)
    },
    checkLogin () {
      if (!LoginStorage.getLoginStatus) {
        this.$Message.warning('你还未登录，请登录')
        return false
      }
      return true
    },
    goUserCenter () {
      if (!this.checkLogin) return
      this.$router.push({
        name: 'userCenter',
        query: {
          name: 'userMsg'
        }
      })
    },
    checkShopCar () {
      if (!this.checkLogin) return
      this.$router.push('cart')
    },
    checkCollection () {
      if (!this.checkLogin) return
      this.$router.push('collection')
    }
  }
}
</script>
