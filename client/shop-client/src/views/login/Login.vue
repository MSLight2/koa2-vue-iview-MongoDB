<template>
  <div class="main">
    <div class="login-main"></div>
    <jelly-canvas/>
    <div class="login-box">
      <div class="login-logo"></div>
      <div class="login-input">
        <span class="login-icon-user"></span>
        <input class="login-input" type="text" placeholder="请输入用户名/手机号/邮箱">
      </div>
      <div class="login-pwd">
        <span class="login-icon-pwd"></span>
        <input class="login-input" type="password" placeholder="请输入密码">
      </div>
      <!-- btn -->
      <div class="login-box-btns">
        <div class="login-btn-tip">
          <div class="remined-pwd">
            <span>记住密码</span>
          </div>
          <span>忘记密码</span>
          <span>立即注册</span>
        </div>
        <div class="login-btn">登录</div>
      </div>
      <!-- btn end -->
    </div>
  </div>
</template>

<script>
import JellyCanvas from '@/components/puppetComponent/JellyCanvas'
export default {
  data () {
    return {
    }
  },
  components: {
    JellyCanvas
  }
}
</script>

<style scoped>
  .main{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../assets/img/timg.jpg');
    background-size: 100% 100%;
    z-index: 1;
  }
  .login-box{
    position: absolute;
    width: 400px;
    height: 480px;
    background: rgba(255,255,255, 0.9);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px 10px;
    box-shadow: 0 0 5px 0 #ccc;
    z-index: 999;
  }
</style>
