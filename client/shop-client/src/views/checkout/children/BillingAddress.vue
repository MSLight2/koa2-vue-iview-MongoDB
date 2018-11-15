<template>
  <div class="col-md-7">
    <div class="billing-details">
      <div class="section-title">
        <h3 class="title">收货地址</h3>
        <Button
          type="text"
          size="large"
          class="address-edit"
          v-if="addressList.length > 0"
          @click="editAddress">编辑
        </Button>
      </div>
      <Form
        ref="addressForms"
        :model="addressForm"
        :rules="addressFormRule">
          <div class="form-group">
            <FormItem prop="orderName">
              <Input
                v-model="addressForm.orderName"
                placeholder="姓名、昵称"
                size="large"
                :disabled="addressList.length > 0 && !isEdit"
                :maxlength="30"
              />
            </FormItem>
          </div>
          <div class="form-group">
            <FormItem prop="orderEmail">
              <Input
                type="email"
                v-model="addressForm.orderEmail"
                placeholder="邮箱"
                size="large"
                :disabled="addressList.length > 0 && !isEdit"
                :maxlength="30"
              />
            </FormItem>
          </div>
          <div class="form-group">
            <FormItem prop="orderAddress">
              <Input
                type="text"
                v-model="addressForm.orderAddress"
                placeholder="详细地址"
                size="large"
                :disabled="addressList.length > 0 && !isEdit"
                :maxlength="40"
              />
            </FormItem>
          </div>
          <div class="form-group">
            <FormItem prop="orderCity">
              <Input
                type="text"
                v-model="addressForm.orderCity"
                placeholder="省-市"
                size="large"
                :disabled="addressList.length > 0 && !isEdit"
                :maxlength="30"
              />
            </FormItem>
          </div>
          <div class="form-group">
            <FormItem prop="orderPhone">
              <Input
                type="text"
                v-model="addressForm.orderPhone"
                placeholder="手机号码"
                size="large"
                :disabled="addressList.length > 0 && !isEdit"
                :maxlength="15"
                @keyup.native="inputNumber(1)"
                @blur="inputNumber(1)"
              />
            </FormItem>
          </div>
          <div class="form-group">
            <div class="input-checkbox" :class="{'not-click': addressList.length > 0 && !isEdit}">
              <input type="checkbox" id="create-account" value="addAccount" v-model="orderCreateCheck">
              <label for="create-account"><span></span>设为默认地址?</label>
            </div>
          </div>
          <Button
            type="error"
            size="large"
            :loading="btnLoading" long
            @click="saveAddress">保存
          </Button>
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
                <FormItem prop="addOrderName">
                  <Input
                    v-model="otherAddressForm.addOrderName"
                    placeholder="姓名、昵称"
                    size="large"
                    :maxlength="30"
                  />
                </FormItem>
              </div>
              <div class="form-group">
                <FormItem prop="addOrderEmail">
                  <Input
                    type="email"
                    v-model="otherAddressForm.addOrderEmail"
                    placeholder="邮箱"
                    size="large"
                    :maxlength="30"
                  />
                </FormItem>
              </div>
              <div class="form-group">
                <FormItem prop="addOrderAddress">
                  <Input
                    type="text"
                    v-model="otherAddressForm.addOrderAddress"
                    placeholder="详细地址"
                    size="large"
                    :maxlength="40"
                  />
                </FormItem>
              </div>
              <div class="form-group">
                <FormItem prop="addOrderCity">
                  <Input
                    type="text"
                    v-model="otherAddressForm.addOrderCity"
                    placeholder="省-市"
                    size="large"
                    :maxlength="30"
                  />
                </FormItem>
              </div>
              <div class="form-group">
                <FormItem prop="addOrderPhone">
                  <Input
                    type="text"
                    v-model="otherAddressForm.addOrderPhone"
                    placeholder="手机号码"
                    size="large"
                    :maxlength="30"
                    @keyup.native="inputNumber(0)"
                    @blur="inputNumber(0)"
                  />
                </FormItem>
              </div>
              <Button
                type="warning"
                size="large" long
                :loading="btnLoading"
                @click="addAddress">新增地址
              </Button>
          </Form>
        </div>
      </div>
    </div>
    <!--<div class="order-notes">
      <textarea class="input" placeholder="订单备注" style="resize:none" v-model="orderRemarks"></textarea>
    </div>-->
  </div>
</template>

<script>
import Utils from '@/utils/utils'
import * as AddressApi from '@/api/address'

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
        orderName: [
          { required: true, message: '请填写名字/昵称', trigger: 'blur' },
        ],
        orderEmail: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' },
          { validator: this.validateEmail, trigger: 'blur' }
        ],
        orderAddress: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
        ],
        orderCity: [
          { required: true, message: '请填写所在的省-市', trigger: 'blur' },
        ],
        orderPhone: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          { validator: this.validatePhone, trigger: 'blur' }
        ]
      },
      otherAddressForm: {
        addOrderName: '',
        addOrderEmail: '',
        addOrderAddress: '',
        addOrderCity: '',
        addOrderPhone: ''
      },
      otheAddressFormRule: {
        addOrderName: [
          { required: true, message: '请填写名字/昵称', trigger: 'blur' },
        ],
        addOrderEmail: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' },
          { validator: this.validateEmail, trigger: 'blur' }
        ],
        addOrderAddress: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
        ],
        addOrderCity: [
          { required: true, message: '请填写所在的省-市', trigger: 'blur' },
        ],
        addOrderPhone: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          { validator: this.validatePhone, trigger: 'blur' }
        ]
      },
      isEdit: false,
      btnLoading: false
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
    // 自定义验证
    validateEmail (rule, value, callback) {
      if (!Utils.isEmail(value)) {
        return callback(new Error('邮箱地址格式不正确'))
      }
      callback()
    },
    validatePhone (rule, value, callback) {
      if (!Utils.isPhone(value)) {
        return callback(new Error('手机号码格式不正确'))
      }
      callback()
    },
    // 内容是否改变
    validateIsChange (originalData, compareData) {
      if (this.addressList.length > 0) {
        let _isDefault = this.orderCreateCheck.length > 0 ? true : ''
        let { nickName, email, detailAddress, city, phone, isDefault } = originalData
        let { orderName, orderEmail, orderAddress, orderCity, orderPhone } = compareData
        if (nickName !== orderName || email !== orderEmail || detailAddress !== orderAddress || city !== orderCity || phone !== orderPhone ||isDefault !== _isDefault) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    inputNumber (val) {
      if (val) {
        this.addressForm.orderPhone = this.addressForm.orderPhone.replace(/\D/, '')
      } else {
        this.otherAddressForm.addOrderPhone = this.otherAddressForm.addOrderPhone.replace(/\D/, '')
      }
    },
    // 编辑地址
    editAddress () {
      this.isEdit = true
    },
    // 保存地址
    saveAddress () {
      if (!this.validateIsChange(this.addressList[0], this.addressForm)) {
        this.$Message.warning('请修改收货地址后在保存')
        return
      }
      this.$refs['addressForms'].validate(valid => {
        if (valid) {
          this.isEdit = false
          let postData = {
            addressId: this.addressList[0]._id,
            nickName: this.addressForm.orderName,
            email: this.addressForm.orderEmail,
            detailAddress: this.addressForm.orderAddress,
            city: this.addressForm.orderCity,
            phone: this.addressForm.orderPhone,
            isDefault: this.orderCreateCheck.length > 0 ? true : ''
          }
          this.btnLoading = true
          AddressApi.EditAddress(postData).then(res => {
            this.btnLoading = false
            if (res.isSuccess) {
              this.$Message.success('保存成功')
              this.$emit('reload')
            } else {
              this.$Message.error(res.errMsg)
            }
          }).catch(err => {
            this.btnLoading = false
            if (err.code >= 1000 & err.code <= 1002) {
              this.$Message.error('登录过期，请重新登录')
            } else {
              this.$Message.error('服务器休息中，请稍后重试')
            }
          })
        }
      })
    },
    // 新增地址
    addAddress () {
      this.$refs['otherAddressForms'].validate(valid => {
        if (valid) {
          this.isEdit = false
          let postData = {
            nickName: this.otherAddressForm.addOrderName,
            email: this.otherAddressForm.addOrderEmail,
            detailAddress: this.otherAddressForm.addOrderAddress,
            city: this.otherAddressForm.addOrderCity,
            phone: this.otherAddressForm.addOrderPhone
          }
          this.btnLoading = true
          AddressApi.AddAddress(postData).then(res => {
            this.btnLoading = false
            if (res.isSuccess) {
              this.$Message.success('增加收货地址成功')
              this.addOrderCheck = []
              this.otherAddressForm.addOrderName = ''
              this.otherAddressForm.addOrderEmail = ''
              this.otherAddressForm.addOrderAddress = ''
              this.otherAddressForm.addOrderCity = ''
              this.otherAddressForm.addOrderPhone = ''
            } else {
              this.$Message.error(res.errMsg)
            }
          }).catch(err => {
            this.btnLoading = false
            if (err.code >= 1000 & err.code <= 1002) {
              this.$Message.error('登录过期，请重新登录')
            } else {
              this.$Message.error('服务器休息中，请稍后重试')
            }
          })
        }
      })
    }
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
        if (dataItem.isDefault) {
          this.orderCreateCheck = ['addAccount']
        }
      } else {
        this.addressForm.orderName = ''
        this.addressForm.orderEmail = ''
        this.addressForm.orderAddress = ''
        this.addressForm.orderCity = ''
        this.addressForm.orderPhone = ''
        this.orderCreateCheck = []
      }
    }
  }
}
</script>

<style scoped>
  .address-edit{
    position: absolute;
    right: 0;
    top: -2px;
    color: #D10024;
  }
  .billing-details >>> .ivu-btn-error{
    background-color: #D10024;
    border-color: #D10024;
  },
  .not-click{
    pointer-events: none;
    color: #ccc;
  }
</style>
