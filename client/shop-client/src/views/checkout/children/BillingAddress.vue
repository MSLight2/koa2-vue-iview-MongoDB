<template>
  <div class="col-md-7">
    <div class="billing-details">
      <div class="section-title">
        <h3 class="title">收货地址</h3>
      </div>
      <div class="form-group">
        <input class="input" type="text" name="first-name" placeholder="姓名、昵称" v-model="orderName">
      </div>
      <div class="form-group">
        <input class="input" type="email" name="email" placeholder="邮箱" v-model="orderEmail">
      </div>
      <div class="form-group">
        <input class="input" type="text" name="address" placeholder="详细地址" v-model="orderAddress">
      </div>
      <div class="form-group">
        <input class="input" type="text" name="city" placeholder="省-市" v-model="orderCity">
      </div>
      <div class="form-group">
        <input class="input" type="tel" name="tel" placeholder="手机号码" v-model="orderPhone">
      </div>
      <div class="form-group">
        <div class="input-checkbox">
          <input type="checkbox" id="create-account" value="addAccount" v-model="orderCreateCheck">
          <label for="create-account">
            <span></span>
            没有账户?
          </label>
          <div class="caption">
            <p>在下方输入框中输入密码，将自动为你创建一个账户</p>
            <input class="input" type="password" name="password" placeholder="输入你的密码" v-model="orderCreatePwd">
          </div>
        </div>
      </div>
    </div>
    <div class="shiping-details">
      <div class="section-title">
        <h3 class="title">其它搜货地址</h3>
      </div>
      <div class="input-checkbox">
        <input type="checkbox" id="shiping-address" value="addAddress" v-model="addOrderCheck">
        <label for="shiping-address">
          <span></span>
          是否新增其它搜货地址?
        </label>
        <div class="caption">
          <div class="form-group">
            <input class="input" type="text" name="first-name" placeholder="姓名、昵称" v-model="addOrderName">
          </div>
          <div class="form-group">
            <input class="input" type="email" name="email" placeholder="邮箱" v-model="addOrderEmail">
          </div>
          <div class="form-group">
            <input class="input" type="text" name="address" placeholder="详细地址" v-model="addOrderAddress">
          </div>
          <div class="form-group">
            <input class="input" type="text" name="city" placeholder="省-市" v-model="addOrderCity">
          </div>
          <div class="form-group">
            <input class="input" type="tel" name="tel" placeholder="手机号码" v-model="addOrderPhone">
          </div>
        </div>
      </div>
    </div>
    <div class="order-notes">
      <textarea class="input" placeholder="订单备注" style="resize:none" v-model="orderRemarks"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderName: '',
      orderEmail: '',
      orderAddress: '',
      orderCity: '',
      orderPhone: '',
      orderCreateCheck: [],
      orderCreatePwd: '',
      addOrderCheck: [],
      addOrderName: '',
      addOrderEmail: '',
      addOrderAddress: '',
      addOrderCity: '',
      addOrderPhone: '',
      orderRemarks: ''
    }
  },
  methods: {
  }
}
</script>
