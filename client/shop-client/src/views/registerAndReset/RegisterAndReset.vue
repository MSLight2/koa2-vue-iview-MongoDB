<template>
  <div class="regist-main">
    <div class="logo"><img src="@/assets/img/logo.png" alt="logo" /></div>
    <div class="regist-cnt">
      <div class="regist-form">
        <Form
          ref="registFormValidate"
          :model="registFormValidate"
          :rules="ruleValidate"
          :label-width="80">
            <FormItem label="用户名" prop="name">
              <Input
                v-model="registFormValidate.name"
                placeholder="手机号/邮箱"
                :maxlength="40"
              />
            </FormItem>
            <FormItem label="昵称" prop="nickName" v-if="isRegisterRoute">
              <Input
                v-model="registFormValidate.nickName"
                placeholder="昵称"
                :maxlength="20"
              />
            </FormItem>
            <FormItem label="密码" prop="pwd">
              <Input
                type="password"
                v-model="registFormValidate.pwd"
                placeholder="密码"
                :maxlength="20"
              />
            </FormItem>
            <FormItem label="确认密码" prop="pwdAgain">
              <Input
                type="password"
                v-model="registFormValidate.pwdAgain"
                placeholder="确认密码"
                :maxlength="20"
              />
            </FormItem>
        </Form>
        <div class="regist-btn">
          <div class="" @click="registerAndReset"></div>
          <Button
            @click="registerAndReset"
            class="rg-btn"
            :loading="loading">
              {{isRegisterRoute ? '注册' : '重置'}}
          </Button>
          <div class="tip" v-if="isRegisterRoute" @click="goLogin">已有账号？<u>请登录</u></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '@/utils/utils'

export default {
  data () {
    return {
      loading: false,
      isRegisterRoute: true,
      registFormValidate: {
        name: '',
        nickName: '',
        pwd: '',
        pwdAgain: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { validator: this.validateUserName, trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请填写昵称', trigger: 'blur' },
          { validator: this.validateNickName, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { validator: this.validatePwd, trigger: 'blur' }
        ],
        pwdAgain: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
          { validator: this.validatePwdAgian, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (this.$route.name === 'register') {
      this.isRegisterRoute = true
    } else {
      this.isRegisterRoute = false
    }
  },
  methods: {
    // 自定义验证
    validateUserName (rule, value, callback) {
      if (!Utils.isPhone(value) && !Utils.isEmail(value)) {
        return callback(new Error('手机号码或邮箱格式不正确'))
      }
      callback()
    },
    validateNickName (rule, value, callback) {
      if (/[^\w_]/g.test(value)) {
        return callback(new Error('昵称命名不规范（只能输入数字、字母和下划线‘_’）'))
      }
      callback()
    },
    validatePwd (rule, value, callback) {
      if (value.length < 6) return callback(new Error('密码长度不能小于6位数'))
      callback()
    },
    validatePwdAgian (rule, value, callback) {
      if (this.registFormValidate.pwd !== this.registFormValidate.pwdAgain) {
        return callback(new Error('两次输入的密码不一致，请确认'))
      }
      callback()
    },
    // 注册或重置
    registerAndReset () {
      if (this.isRegisterRoute) {
        // 注册
      } else {
        // 重置
      }
    },
    goLogin () {
      this.$router.replace('login')
    }
  }
}
</script>

<style scoped>
  .regist-main{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: url('../../assets/img/regist.jpg');
    background-size: 100% 100%;
    z-index: 1;
    user-select: none;
  }
  .logo{
    border-radius: 50%;
    width: 120px;
    height: 120px;
    border: 5px solid #fff;
    margin-top: 80px;
  }
  .logo img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  .regist-cnt{
    padding: 30px 40px 20px 20px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    margin-bottom: 150px;
    margin-top: 40px;
  }
  .regist-form{
    width: 400px;
    text-align: center;
  }
  .rg-btn{
    position: relative;
    width: 80%;
    margin-left: 80px;
    line-height: 30px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    background: #D10024;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 30px;
    border: none;
    overflow: hidden;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  }
  .regist-btn .tip{
    color: #D10024;
    margin-top: 20px;
    margin-left: 60px;
    cursor: pointer;
  }
  .regist-form >>> .ivu-form .ivu-form-item-label{color: #333;}
  .regist-form >>> .ivu-form-item-error-tip,
  .regist-form >>> .ivu-form-item-required .ivu-form-item-label:before{
    color: #D10024;
  }
  .regist-form >>> .ivu-form-item-error .ivu-input{
    border: 1px solid #D10024;
  }
</style>
