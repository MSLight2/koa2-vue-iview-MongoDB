<template>
  <div>
    <div class="user-header">
      <h3>个人资料</h3>
      <div class="user-btn">
        <Button type="primary" shape="circle" icon="ios-create" @click="editInfo">编辑</Button>
        <Button type="error" shape="circle" icon="md-close">注销</Button>
      </div>
      <div class="user-motto" :class="{'user-motto-space': isEditMotto}">
        <p class="motto" v-if="!isEditMotto">{{userInfoData.motto || '你的座右铭'}}</p>
        <input
          v-else
          v-model="userMotto"
          class="motto-input"
          type="text"
          maxlength="50"
          placeholder="请输入你的座右铭"
          @keyup.enter="saveEditMotto"
        >
        <Button
          v-if="!isEditMotto"
          type="text"
          shape="circle"
          icon="md-brush"
          @click="editMotto">
        </Button>
        <template v-else>
          <div>
            <Button
              style="margin-right: 10px;"
              type="primary"
              shape="circle"
              icon="md-close"
              @click="isEditMotto = false">
            </Button>
            <Button
              type="success"
              shape="circle"
              icon="md-checkmark"
              :loading="btnLoading"
              @click="saveEditMotto">
            </Button>
          </div>
        </template>
      </div>
    </div>
    <template v-if="isEdit">
    <div class="user-info">
      <Form ref="userMsgForms" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <div class="user-input1">
          <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名" :maxlength="20"/>
          </FormItem>
          <FormItem label="昵称" prop="nickName">
            <Input v-model="formValidate.nickName" placeholder="请输入昵称" :maxlength="20"/>
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
            <Input v-model="formValidate.email" placeholder="请输入邮箱地址" :maxlength="30"/>
          </FormItem>
          <FormItem label="电话号码" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入电话号码" :maxlength="11"/>
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="formValidate.address" placeholder="请输入详细地址" :maxlength="50"/>
          </FormItem>
          <FormItem label="出生日期" prop="birthday">
            <DatePicker
              v-model="formValidate.birthday"
              type="date"
              :editable="false"
              placeholder="请选择日期">
            </DatePicker>
          </FormItem>
        </div>
      </Form>
    </div>
    <div class="edit-btm-btn">
      <Button type="primary" size="large" icon="ios-close" @click="cancelEdit">取消</Button>
      <Button
        type="success"
        size="large"
        icon="md-checkmark"
        :loading="btnLoading"
        @click="saveEdit">保存
      </Button>
    </div>
    </template>
    <template v-else>
      <div class="user-info-detail">
        <ul>
          <li><span class="left-label">昵称：</span>{{userInfoData.nickName || '----'}}</li>
          <li><span class="left-label">姓名：</span>{{userInfoData.name || '----'}}</li>
          <li><span class="left-label">年龄：</span>{{userInfoData.age || '18岁？嗯哼~'}}</li>
          <li><span class="left-label">性别：</span>{{userInfoData.sex ? '男' : '女'}}</li>
          <li><span class="left-label">邮箱：</span>{{userInfoData.email || '----'}}</li>
          <li><span class="left-label">电话号码：</span>{{userInfoData.phone || 'xxxxxx'}}</li>
          <li><span class="left-label">地址：</span>{{userInfoData.address || '----（你是住空中吗？）'}}</li>
          <li><span class="left-label">出生日期：</span>{{userInfoData.birthday | formatDate}}</li>
        </ul>
        <div class="flash-txt">{{printMottoStr}}<i class="cursor" v-if="!isPrintFinished">|</i></div>
      </div>
      <div class="smile-icon" @click="showMottoAgain">
        <!-- eslint-disable -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--happy-"></use>
        </svg>
      </div>
    </template>
  </div>
</template>

<script>
import Utils from '@/utils/utils'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { EditUserInfo, EditUserMotto } from '@/api/login'

export default {
  data () {
    return {
      userInfoData: {},
      btnLoading: false,
      userMotto: '',
      ageList: [],
      selectAge: '',
      isEditMotto: false,
      isEdit: false,
      mottoStr: '人的一生很短，也很长。世事无常，活在当下，珍惜身边爱你和你所爱。',
      printMottoStr: '',
      isPrintFinished: true,
      interval: null,
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
          { required: true, message: '请填写名字', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请填写昵称', trigger: 'blur' }
        ],
        age: [
          { required: true, type: 'string', message: '请选择年龄', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请填写邮箱地址', trigger: 'blur' },
          { validator: this.validateUserEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写号码', trigger: 'blur' },
          { validator: this.validateUserPhone, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ],
        birthday: [
          { required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.initAge()
    this.userInfoData = this.userInfoGetter
    if (this.userInfoGetter.motto) this.mottoStr = this.userInfoGetter.motto
  },
  beforeDestroy () {
    if (this.interval) clearInterval(this.interval)
  },
  computed: {
    ...mapGetters({
      userInfoGetter: 'getUserInfoData'
    })
  },
  watch: {
    userInfoGetter () {
      this.userInfoData = this.userInfoGetter
      if (this.userInfoGetter.motto) this.mottoStr = this.userInfoGetter.motto
    }
  },
  methods: {
    initAge () {
      for (let i = 16; i <= 100; i++) {
        this.ageList.push({ value: i.toString(), label: i.toString() })
      }
    },
    showMottoAgain () {
      if (this.isPrintFinished) {
        clearInterval(this.interval)
        this.mottoPrinting()
      }
    },
    mottoPrinting () {
      let len = this.mottoStr.length
      let current = 1
      this.isPrintFinished = false
      this.interval = setInterval(() => {
        if (current > len) {
          current = 1
          this.isPrintFinished = true
          clearInterval(this.interval)
          return
        }
        this.printMottoStr = this.mottoStr.substring(0, current)
        current++
      }, 200)
    },
    // 编辑
    editInfo () {
      this.formValidate.name = this.userInfoData.name
      this.formValidate.nickName = this.userInfoData.nickName
      this.formValidate.age = this.userInfoData.age + ''
      this.formValidate.sex = this.userInfoData.sex ? 'male' : 'female'
      this.formValidate.email = this.userInfoData.email
      this.formValidate.address = this.userInfoData.address
      this.formValidate.birthday = this.userInfoData.birthday || null
      this.formValidate.phone = this.userInfoData.phone
      this.isEdit = true
    },
    // 保存
    saveEdit () {
      this.$refs['userMsgForms'].validate(valid => {
        if (valid) {
          let postData = {
            name: this.formValidate.name,
            nickName: this.formValidate.nickName,
            age: parseInt(this.formValidate.age) || 0,
            sex: this.formValidate.sex === 'male' ? 1 : 0,
            email: this.formValidate.email,
            address: this.formValidate.address,
            birthday: this.formValidate.birthday,
            phone: this.formValidate.phone
          }
          this.btnLoading = true
          EditUserInfo(postData).then(res => {
            this.isEdit = false
            this.btnLoading = false
            if (res.isSuccess) {
              this.$Message.success('保存成功')
              this.$store.dispatch('getUserInfoAction')
            } else {
              this.$Message.warning(res.errMsg)
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
    // 编辑座右铭
    editMotto () {
      this.isEditMotto = true
      this.userMotto = this.userInfoGetter.motto
    },
    // 保存座右铭
    saveEditMotto () {
      if (!this.userMotto) {
        this.$Message.error('请输入你的座右铭')
        return
      }
      this.btnLoading = true
      EditUserMotto({ motto: this.userMotto }).then(res => {
        this.btnLoading = false
        this.isEditMotto = false
        if (res.isSuccess) {
          this.$Message.success('编辑成功')
          this.$store.dispatch('getUserInfoAction')
        } else {
          this.$Message.warning(res.errMsg)
        }
      }).catch(err => {
        this.btnLoading = false
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器休息中，请稍后重试')
        }
      })
    },
    // 取消
    cancelEdit () {
      this.isEdit = false
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
  filters: {
    formatDate (val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD')
      } else {
        return '无（你是石头蹦出来的吗？）'
      }
    }
  }
}
</script>
