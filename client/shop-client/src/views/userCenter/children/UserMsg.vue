<template>
  <div>
    <div class="user-header">
      <h3>个人资料</h3>
      <div class="user-btn">
        <Button type="primary" shape="circle" icon="ios-create">编辑</Button>
        <Button type="error" shape="circle" icon="md-close">注销</Button>
      </div>
      <div class="user-motto">
        <p class="motto">人的一生很短，也很长。世事无常，活在当下，珍惜身边爱你和你所爱。</p>
        <Button type="error" shape="circle" icon="md-brush"></Button>
      </div>
    </div>
    <template v-if="isEdit">
    <div class="user-info">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <div class="user-input1">
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
        </div>
        <div class="user-input2">
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
            <DatePicker v-model="formValidate.birthday" type="date" placeholder="请选择日期"></DatePicker>
          </FormItem>
        </div>
      </Form>
    </div>
    <div class="edit-btm-btn">
      <Button type="primary" size="large" icon="ios-close">取消</Button>
      <Button type="success" size="large" icon="md-checkmark">保存</Button>
    </div>
    </template>
    <template v-else>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ageList: [],
      selectAge: '',
      isEdit: false,
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
      }
    }
  },
  mounted () {
    this.initAge()
  },
  methods: {
    initAge () {
      for (let i = 16; i <= 100; i++) {
        this.ageList.push({ value: i.toString(), label: i.toString() })
      }
    }
  }
}
</script>
