<template>
  <div class="regist-main">
    <div class="logo"><img src="@/assets/img/logo.png" alt="logo" /></div>
    <div class="regist-cnt">
      <div class="regist-form">
        <Form
          ref="registFormValidatesRef"
          :model="registFormValidate"
          :rules="ruleValidate"
          :label-width="80">
            <FormItem label="用户名" prop="name">
              <Input
                v-model="registFormValidate.name"
                placeholder="手机号/邮箱"
                size="large"
                :maxlength="40"
              />
            </FormItem>
            <FormItem label="昵称" prop="nickName" v-if="isRegisterRoute">
              <Input
                v-model="registFormValidate.nickName"
                placeholder="昵称"
                size="large"
                :maxlength="20"
              />
            </FormItem>
            <FormItem label="密码" prop="pwd">
              <Input
                type="password"
                v-model="registFormValidate.pwd"
                placeholder="密码"
                size="large"
                :maxlength="20"
              />
            </FormItem>
            <FormItem label="确认密码" prop="pwdAgain">
              <Input
                type="password"
                v-model="registFormValidate.pwdAgain"
                placeholder="确认密码"
                size="large"
                :maxlength="20"
                @keyup.native.enter="registerAndReset"
              />
            </FormItem>
        </Form>
        <div class="regist-btn">
          <Button
            @click="registerAndReset"
            class="rg-btn"
            :loading="loading">
              {{isRegisterRoute ? '注册' : '重置'}}
          </Button>
          <div class="tip" v-if="isRegisterRoute" @click="goLogin">已有账号？<u>去登录</u></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Utils from '@/utils/utils'
  import * as Api from '@/api/login'
  import { Md5 } from 'ts-md5'
  import { onMounted, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { type Form, Message } from 'view-ui-plus';

  const route = useRoute();
  const router = useRouter();

  const loading = ref<boolean>(false);
  const isRegisterRoute = ref<boolean>(true);
  const registFormValidate = reactive({
    name: '',
    nickName: '',
    pwd: '',
    pwdAgain: ''
  });
  const registFormValidatesRef = ref<InstanceType<typeof Form> | null>(null);

  const ruleValidate = {
    name: [
      { required: true, message: '请填写用户名', trigger: 'blur' },
      { validator: validateUserName, trigger: 'blur' }
    ],
    nickName: [
      { required: true, message: '请填写昵称', trigger: 'blur' },
      { validator: validateNickName, trigger: 'blur' }
    ],
    pwd: [
      { required: true, message: '请填写密码', trigger: 'blur' },
      { validator: validatePwd, trigger: 'blur' }
    ],
    pwdAgain: [
      { required: true, message: '请再次确认密码', trigger: 'blur' },
      { validator: validatePwdAgian, trigger: 'blur' }
    ]
  }

  onMounted(() => {
    if (route.name === 'register') {
      isRegisterRoute.value = true
    } else {
      isRegisterRoute.value = false
    }
  });

  // 自定义验证
  function validateUserName (_rule: any, value: string, callback: Function) {
    if (!Utils.isPhone(value) && !Utils.isEmail(value)) {
      return callback(new Error('手机号码或邮箱格式不正确'))
    }
    callback()
  }
  function validateNickName (_rule: any, value: string, callback: Function) {
    if (/[^\w_\u4e00-\u9fa5]/g.test(value)) {
      return callback(new Error('昵称命名不规范（只能输入中文、数字、字母和下划线‘_’）'))
    }
    callback()
  }
  function validatePwd (_rule: any, value: string, callback: Function) {
    if (value.length < 6) return callback(new Error('密码长度不能小于6位数'))
    callback()
  }
  function validatePwdAgian (_rule: any, _value: any, callback: Function) {
    if (registFormValidate.pwd !== registFormValidate.pwdAgain) {
      return callback(new Error('两次输入的密码不一致，请确认'))
    }
    callback()
  }

  // 注册或重置
  function registerAndReset () {
    // @ts-ignore
    registFormValidatesRef.value?.validate((valid: any) => {
      if (valid) {
        if (isRegisterRoute.value) {
          // 注册
          register()
        } else {
          // 重置
          reset()
        }
      }
    })
  }

   // 注册
   function register () {
    let params = {
      userName: registFormValidate.name,
      nickName: registFormValidate.nickName,
      password: Md5.hashStr(registFormValidate.pwd),
      passwordAgian: Md5.hashStr(registFormValidate.pwdAgain)
    }
    Api.UserRegist(params).then((res: any) => {
      if (res?.errMsg) {
        Message.warning(res.errMsg)
      } else {
        Message.success('注册成功')
        setTimeout(() => {
          router.go(-1)
        }, 2000)
      }
    }).catch(() => {
      Message.error('服务器休息中，请稍后重试')
    })
  }

  // 重置密码
  function reset () {
    let params = {
      userName: registFormValidate.name,
      password: Md5.hashStr(registFormValidate.pwd),
      passwordAgian: Md5.hashStr(registFormValidate.pwdAgain)
    }
    Api.UserResetPassword(params).then((res: any) => {
      if (res?.errMsg) {
        Message.warning(res.errMsg)
      } else {
        Message.success('密码已重置')
        setTimeout(() => {
          router.go(-1)
        }, 2000)
      }
    }).catch(() => {
      Message.error('服务器休息中，请稍后重试')
    })
  }
  function goLogin () {
    router.go(-1)
  }
</script>

<style scoped lang="less">
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
    overflow: hidden;
    img{
      height: 100%;
      border-radius: 50%;
    }
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
    padding: 5px 0 6px;
    box-sizing: content-box;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  }
  .regist-btn .tip{
    color: #D10024;
    margin-top: 20px;
    margin-left: 60px;
    cursor: pointer;
  }
  .regist-form{
    :deep(.ivu-form .ivu-form-item-label) {
      color: #333;
    }
    :deep(.ivu-form-item-error-tip) {
      color: #D10024;
    }
    :deep(.ivu-form-item-required .ivu-form-item-label:before) {
      color: #D10024;
    }
    :deep(.ivu-form-item-error .ivu-input) {
      border: 1px solid #D10024;
    }
  }
</style>