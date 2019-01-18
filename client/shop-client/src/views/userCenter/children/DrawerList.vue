<template>
  <div>
    <Drawer
      :title="title"
      v-model="showDrawer"
      width="720"
      :mask-closable="false"
      @on-close="close"
    >
      <Form ref="userAddresFroms" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="昵称" prop="nickName">
          <Input v-model="formValidate.nickName" placeholder="请输入昵称" :maxlength="20"/>
        </FormItem>
        <FormItem label="邮箱地址" prop="email">
          <Input v-model="formValidate.email" placeholder="请输入邮箱地址" :maxlength="30"/>
        </FormItem>
        <FormItem label="手机号码" prop="phone">
          <Input v-model="formValidate.phone" placeholder="请输入手机号码" :maxlength="11"/>
        </FormItem>
        <FormItem label="省市" prop="city">
          <Input v-model="formValidate.city" placeholder="请输入省市" :maxlength="20"/>
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formValidate.address" placeholder="请输入详细地址" :maxlength="100"/>
        </FormItem>
        <FormItem label="是否为默认地址" prop="isDefault">
          <RadioGroup v-model="formValidate.isDefault">
            <Radio label="true">是</Radio>
            <Radio label="false">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="close">取消</Button>
        <Button type="primary" @click="sureSubmit">确定</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import Utils from '@/utils/utils'
export default {
  data () {
    return {
      showDrawer: false,
      cityList: [],
      formValidate: {
        nickName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        isDefault: 'false'
      },
      ruleValidate: {
        nickName: [
          { required: true, message: '请填写昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' },
          { validator: this.validateUserEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写手机号码', trigger: 'blur' },
          { validator: this.validateUserPhone, trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请填写省市', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写收货地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  props: {
    isShow: {
      type: Boolean,
      require: true,
      default: false
    },
    title: {
      type: String,
      default: '编辑信息'
    },
    dataInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    openType: {
      type: String,
      default: 'add'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    sureSubmit () {
      this.$refs['userAddresFroms'].validate(valid => {
        if (valid) {
          console.log(this.formValidate)
          this.$emit('sureSubmit', this.formValidate)
        }
      })
    },
    // 验证
    validateUserEmail (rule, value, callback) {
      if (!Utils.isEmail(value)) {
        return callback(new Error('邮箱格式不正确'))
      }
      callback()
    },
    validateUserPhone (rule, value, callback) {
      if (!Utils.isPhone(value)) {
        return callback(new Error('手机号码式不正确'))
      }
      callback()
    }
  },
  watch: {
    isShow () {
      this.showDrawer = this.isShow
      if (this.isShow) this.$refs['userAddresFroms'].resetFields()
    },
    dataInfo () {
      if (this.openType === 'edit') {
        this.formValidate.nickName = this.dataInfo.nickName
        this.formValidate.email = this.dataInfo.email
        this.formValidate.phone = this.dataInfo.phone
        this.formValidate.city = this.dataInfo.city
        this.formValidate.address = this.dataInfo.detailAddress
        this.formValidate.isDefault = this.dataInfo.isDefault ? 'true' : 'false'
      } else {
        this.formValidate.nickName = ''
        this.formValidate.email = ''
        this.formValidate.phone = ''
        this.formValidate.city = ''
        this.formValidate.address = ''
        this.formValidate.isDefault = 'false'
      }
    }
  }
}
</script>
<style>
  .demo-drawer-footer{
    padding: 10px 16px;
    text-align: center;
    background: #fff;
  }
</style>
