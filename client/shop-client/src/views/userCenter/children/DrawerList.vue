<template>
  <div>
    <Drawer
      :title="title"
      v-model="showDrawer"
      width="720"
      :mask-closable="false"
      @on-close="close"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="昵称" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入昵称"/>
        </FormItem>
        <FormItem label="姓名" prop="nickName">
          <Input v-model="formValidate.nickName" placeholder="请输入姓名"/>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Select v-model="formValidate.age" style="width:200px" placeholder="请选择年龄">
            <Option
              v-for="item in ageList"
              :value="item.value"
              :key="item.value">{{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="formValidate.sex">
            <Radio label="male">男</Radio>
            <Radio label="female">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formValidate.email" placeholder="请输入邮箱地址"/>
        </FormItem>
        <FormItem label="电话号码" prop="phone">
          <Input v-model="formValidate.phone" placeholder="请输入电话号码"/>
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input v-model="formValidate.address" placeholder="请输入详细地址"/>
        </FormItem>
        <FormItem label="出生日期" prop="birthday">
          <DatePicker
            v-model="formValidate.birthday"
            :editable="false" type="date"
            placeholder="请选择日期">
          </DatePicker>
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
export default {
  data () {
    return {
      showDrawer: false,
      ageList: [],
      formValidate: {
        name: '',
        nickName: '',
        sex: 'male',
        age: '',
        email: '',
        phone: '',
        address: '',
        birthday: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请填写昵称', trigger: 'blur' }
        ],
        age: [
          { required: true, type: 'string', message: '请选择年龄', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写手机号码', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写收货地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initAge()
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
    }
  },
  methods: {
    initAge () {
      for (let i = 16; i <= 100; i++) {
        this.ageList.push({ value: i.toString(), label: i.toString() })
      }
    },
    close () {
      this.$emit('close')
    },
    sureSubmit () {
      this.$emit('sureSubmit')
    }
  },
  watch: {
    isShow () {
      this.showDrawer = this.isShow
    }
  }
}
</script>
<style>
  .demo-drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
