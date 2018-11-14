<template>
  <div class="col-md-7">
    <div class="billing-details">
      <div class="section-title">
        <h3 class="title">收货地址</h3>
      </div>
      <Form
        ref="addressForms"
        :model="addressForm"
        :rules="addressFormRule">
          <div class="form-group">
            <Input
              v-model="addressForm.orderName"
              placeholder="姓名、昵称"
              size="large"
              :maxlength="30"
            />
          </div>
          <div class="form-group">
            <Input
              type="email"
              v-model="addressForm.orderEmail"
              placeholder="邮箱"
              size="large"
              :maxlength="30"
            />
          </div>
          <div class="form-group">
            <Input
              type="text"
              v-model="addressForm.orderAddress"
              placeholder="详细地址"
              size="large"
              :maxlength="40"
            />
          </div>
          <div class="form-group">
            <Input
              type="text"
              v-model="addressForm.orderCity"
              placeholder="省-市"
              size="large"
              :maxlength="30"
            />
          </div>
          <div class="form-group">
            <Input
              type="text"
              v-model="addressForm.orderPhone"
              placeholder="手机号码"
              size="large"
              :maxlength="30"
            />
          </div>
          <div class="form-group">
            <div class="input-checkbox">
              <input type="checkbox" id="create-account" value="addAccount" v-model="orderCreateCheck">
              <label for="create-account"><span></span>设为默认地址?</label>
            </div>
          </div>
      </Form>
      <!--<div class="form-group">
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
      </div>-->
    </div>
    <div class="shiping-details" v-if="addressList.length > 0">
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
          <Form
            ref="otherAddressForms"
            :model="otherAddressForm"
            :rules="otheAddressFormRule">
              <div class="form-group">
                <Input
                  v-model="otherAddressForm.addOrderName"
                  placeholder="姓名、昵称"
                  size="large"
                  :maxlength="30"
                />
              </div>
              <div class="form-group">
                <Input
                  type="email"
                  v-model="otherAddressForm.addOrderEmail"
                  placeholder="邮箱"
                  size="large"
                  :maxlength="30"
                />
              </div>
              <div class="form-group">
                <Input
                  type="text"
                  v-model="otherAddressForm.addOrderAddress"
                  placeholder="详细地址"
                  size="large"
                  :maxlength="40"
                />
              </div>
              <div class="form-group">
                <Input
                  type="text"
                  v-model="otherAddressForm.addOrderCity"
                  placeholder="省-市"
                  size="large"
                  :maxlength="30"
                />
              </div>
              <div class="form-group">
                <Input
                  type="text"
                  v-model="otherAddressForm.addOrderPhone"
                  placeholder="手机号码"
                  size="large"
                  :maxlength="30"
                />
              </div>
          </Form>
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
      orderCreateCheck: [],
      orderCreatePwd: '',
      addOrderCheck: [],
      orderRemarks: '',
      addressForm: {
        orderName: '',
        orderEmail: '',
        orderAddress: '',
        orderCity: '',
        orderPhone: ''
      },
      addressFormRule: {
      },
      otherAddressForm: {
        addOrderName: '',
        addOrderEmail: '',
        addOrderAddress: '',
        addOrderCity: '',
        addOrderPhone: ''
      },
      otheAddressFormRule: {
      }
    }
  },
  props: {
    addressList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  methods: {
  },
  watch: {
    addressList () {
      if (this.addressList.length > 0) {
        let dataItem = this.addressList[0]
        this.addressForm.orderName = dataItem.nickName
        this.addressForm.orderEmail = dataItem.email
        this.addressForm.orderAddress = dataItem.detailAddress
        this.addressForm.orderCity = dataItem.city
        this.addressForm.orderPhone = dataItem.phone
      }
    }
  }
}
</script>
