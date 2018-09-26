<template>
  <div class="main">
    <div class="login-main"></div>
    <!--<jelly-canvas/>-->
    <div class="login-box">
      <div class="login-logo">
        <img src="@/assets/img/logo.png" alt="logo">
      </div>
      <div class="login-input-cnt">
        <div class="login-input-item">
          <i class="login-icon iconfont icon-user"></i>
          <input class="login-input" type="text" maxlength="30" placeholder="请输入用户名/手机号/邮箱">
        </div>
        <div class="login-input-item">
          <i class="login-icon iconfont icon-password"></i>
          <input class="login-input" type="password" maxlength="30" placeholder="请输入密码">
          <i class="login-icon iconfont icon-password-view" v-show="pwdShow"></i>
          <i class="login-icon iconfont icon-password-not-view" v-show="!pwdShow"></i>
        </div>
      </div>
      <!-- btn -->
      <div class="login-box-btns">
        <div class="login-btn-tip">
          <div class="remined-pwd">
            <input type="checkbox" value="">
            <span>记住密码</span>
          </div>
          <div>
            <span>忘记密码</span>
            <span>立即注册</span>
          </div>
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
      pwdShow: false,
      pwdTypeIsPwd: true
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
    user-select: none;
  }
  .login-box{
    position: absolute;
    width: 400px;
    height: 480px;
    background: rgba(255,255,255, 0.75);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px 20px;
    box-shadow: 0 0 5px 0 #ccc;
    z-index: 999;
  }
  .login-logo{
    text-align: center;
    min-height: 70px;
  }
  .login-input-cnt{
    margin-top: 20px;
    text-align: center;
  }
  .login-input-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    margin: 0 auto;
    padding: 0 10px;
    background: #fff;
    border-radius: 5px;
    margin-top: 10px;
  }
  .login-icon{
    font-size: 26px;
  }
  .login-input{
    flex-grow: 1;
    height: 40px;
    line-height: 40px;
    color: #333;
    font-size: 16px;
    margin-left: 10px;
    padding: 0 10px;
    border-left: 1px solid #eee;
  }
  .login-box-btns{
    margin-top: 10px;
  }
  .login-btn-tip{
    display: flex;
    justify-content: space-between;
  }
  .remined-pwd{
    display: flex;
    align-items: center;
    color: #D10024;
  }
  .remined-pwd>input{
    width: 15px;
    height: 15px;
    border: 1px solid #D10024;
    margin: 0;
  }
  .remined-pwd>span{
    margin-left: 5px;
  }
</style>
