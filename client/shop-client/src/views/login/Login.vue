<template>
  <div class="main">
    <div class="login-main"></div>
    <jelly-canvas/>
    <div class="login-box">
      <div class="login-logo">
        <div class="login-logo-img">
          <img src="@/assets/img/logo.png" alt="logo">
        </div>
        <p class="login-nick">Electro</p>
        <p>早上好，欢迎光临！</p>
      </div>
      <div class="login-input-cnt">
        <div class="login-input-item">
          <i class="login-icon iconfont icon-user"></i>
          <input
            class="login-input"
            v-model="inputUserName"
            type="text"
            maxlength="30"
            placeholder="用户名/手机号/邮箱">
          <span class="user-msg" v-show="userErrorShow">{{userErrorMsg}}</span>
        </div>
        <div class="login-input-item">
          <i class="login-icon iconfont icon-password"></i>
          <input
            class="login-input"
            v-model="inputPassword"
            :type="[pwdIconOpen ? 'text' : 'password']"
            maxlength="30"
            placeholder="密码">
          <i
            class="login-icon iconfont icon-password-view"
            v-show="pwdIconOpen"
            @click="switchPwdEyes">
          </i>
          <i
            class="login-icon iconfont icon-password-not-view"
            v-show="!pwdIconOpen"
            @click="switchPwdEyes">
          </i>
          <span class="pwd-msg" v-show="pwdErrorShow">{{pwdErrorMsg}}</span>
        </div>
      </div>
      <!-- btn -->
      <div class="login-box-btns">
        <div class="login-btn-tip">
          <div class="remined-pwd">
            <input type="checkbox" v-model="reminedPwdChenck" id="rmBox">
            <label class="remined-pwd-label" :class="[reminedPwdChenck.length > 0 ? 'check' : '']" for="rmBox"></label>
            <span>记住密码</span>
          </div>
          <div class="login-btn-right">
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
      pwdIconOpen: false,
      pwdTypeIsPwd: true,
      reminedPwdChenck: [],
      inputUserName: '',
      inputPassword: '',
      userErrorShow: false,
      userErrorMsg: '用户名错误',
      pwdErrorShow: false,
      pwdErrorMsg: '密码错误'
    }
  },
  components: {
    JellyCanvas
  },
  methods: {
    switchPwdEyes () {
      this.pwdIconOpen = !this.pwdIconOpen
    }
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
    height: 380px;
    background: rgba(255,255,255, 0.8);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px 20px;
    box-shadow: 0 0 5px 0 #ccc;
    z-index: 999;
  }
  .login-logo{
    position: relative;
    text-align: center;
    min-height: 70px;
    color: #9a9a9a;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .login-logo-img{
    position: absolute;
    top: -55px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid transparent;
    background: #D10024;
    overflow: hidden;
  }
  .login-logo-img img{
    width: 100%;
    height: 100%;
  }
  .login-nick{
    color: #333;
    font-size: 18px;
    margin: 30px 0 10px 0;
  }
  .login-input-cnt{
    margin-top: 20px;
    text-align: center;
  }
  .login-input-item{
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 45px;
    margin: 0 auto;
    padding: 0 10px;
    background: #fff;
    border-radius: 5px;
    margin-top: 20px;
  }
  .login-icon{
    font-size: 26px;
    color: #999;
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
  .user-msg,.pwd-msg{
    position: absolute;
    right: 0;
    top: 45px;
    color: #D10024;
  }
  .login-box-btns{
    margin-top: 20px;
  }
  .login-btn-tip{
    display: flex;
    justify-content: space-between;
  }
  .remined-pwd{
    display: flex;
    align-items: center;
    color: #7f8c8d;
  }
  .remined-pwd>input{
    display: none;
  }
  .remined-pwd-label{
    width: 15px;
    height: 15px;
    border: 1px solid #D10024;
    margin: 0;
    cursor: pointer;
  }
  .remined-pwd-label.check{
    background: #D10024;
  }
  .remined-pwd>span{
    margin-left: 5px;
  }
  .login-btn-right span{
    cursor: pointer;
    color: #D10024;
  }
  .login-btn-right span:hover{
    text-decoration: underline;
  }
  .login-btn-right>span:first-child{
    color: #7f8c8d;
    margin-right: 10px;
  }
  .login-btn{
    cursor: pointer;
    height: 45px;
    line-height: 45px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    letter-spacing: 10px;
    background: #D10024;
    margin-top: 40px;
    border-radius: 30px;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  }
</style>
