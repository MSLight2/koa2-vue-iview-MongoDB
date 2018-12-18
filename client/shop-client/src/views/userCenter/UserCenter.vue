<template>
  <div class="user-box">
    <div class="user-box-bg"></div>
    <div class="user-box-txt">ELEC<br/>TRO</div>
    <div class="user-main">
      <div class="user-left">
        <h4 class="title">Electro.</h4>
        <div class="user-img">
          <div class="img-icon">
             <img src="https://img3.doubanio.com/view/photo/albumcover/public/p2516893255.webp" alt=""/>
          </div>
          <p>飞来一只菜鸡</p>
        </div>
        <ul class="user-left-list">
          <li
            :class="{'user-left-item': true, 'active': $route.name === 'userMsg'}"
            @click="userChildrenActive('userMsg')">
              <i class="login-icon iconfont icon-gerenziliao"></i>个人资料
          </li>
          <li
            :class="{'user-left-item': true, 'active': $route.name === 'userOrder'}"
            @click="userChildrenActive('userOrder')">
              <i class="login-icon iconfont icon-dingdan1"></i>全部订单
          </li>
          <li
            :class="{'user-left-item': true, 'active': $route.name === 'userCollection'}"
            @click="userChildrenActive('userCollection')">
              <i class="login-icon iconfont icon-shoucang"></i>我的收藏
          </li>
          <li
            :class="{'user-left-item': true, 'active': $route.name === 'userAddress'}"
            @click="userChildrenActive('userAddress')">
              <i class="login-icon iconfont icon-dizhi-01"></i>收货地址
          </li>
        </ul>
      </div>
      <div class="user-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCenter',
  data () {
    return {
    }
  },
  methods: {
    userChildrenActive (children) {
      this.$router.replace({
        name: children
      })
    }
  }
}
</script>
