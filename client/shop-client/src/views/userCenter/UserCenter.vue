<template>
  <div class="user-box">
    <div class="user-box-bg"></div>
    <div class="user-box-txt">ELEC<br/>TRO</div>
    <div class="user-main">
      <div class="user-left">
        <h4 class="title">Electro.</h4>
        <div class="user-img">
          <div class="img-icon">
             <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/ztSCiaznRSyMN9lcpSCOaccqicyoIUtp3WcsJt4JTkxJeJgvodGeDJpjrZdmtQeBFMEGVFiaMFWU7V3GYiaPx1EcjQ/132" alt=""/>
          </div>
          <p>飞来一只菜鸡</p>
        </div>
        <ul class="user-left-list">
          <li
            :class="{'user-left-item': true, 'active': currentActive === 0}"
            @click="userChildrenActive(0, 'userMsg')">
              <i class="login-icon iconfont icon-gerenziliao"></i>个人资料
          </li>
          <li
            :class="{'user-left-item': true, 'active': currentActive === 1}"
            @click="userChildrenActive(1, 'userOrder')">
              <i class="login-icon iconfont icon-dingdan1"></i>全部订单
          </li>
          <li
            :class="{'user-left-item': true, 'active': currentActive === 2}"
            @click="userChildrenActive(2, 'userCollection')">
              <i class="login-icon iconfont icon-shoucang"></i>我的收藏
          </li>
          <li
            :class="{'user-left-item': true, 'active': currentActive === 3}"
            @click="userChildrenActive(3, 'userAddress')">
              <i class="login-icon iconfont icon-dizhi-01"></i>收货地址
          </li>
        </ul>
        <div class="user-left-home">
          <Button
            type="error"
            shape="circle"
            icon="md-home"
            ghost
            @click="goHome">首页
          </Button>
        </div>
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
      currentActive: 0
    }
  },
  methods: {
    userChildrenActive (index, children) {
      this.currentActive = index
      this.$router.replace({
        name: children
      })
    },
    goHome () {
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>

<style>
  .usercenter-empty{
    text-align: center;
    margin-top: 100px;
  }
  .user-store-filter{
    position: absolute;
    right: 60px;
    bottom: 20px;
  }
</style>
