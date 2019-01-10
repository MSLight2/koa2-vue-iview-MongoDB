<template>
  <div>
    <h3 class="user-h3">地址</h3>
    <div class="user-add-address">
      <Button type="primary" shape="circle" icon="md-add" @click="addAddress">新增地址</Button>
    </div>
    <div class="address-box" v-if="!isEmpty && addressList.length > 0">
      <div class="address-item" v-for="(item, index) in addressList" :key="index">
        <div class="address-item-detail">{{item.detailAddress}}</div>
        <div class="address-item-line"><strong>昵称：</strong>{{item.nickName}}</div>
        <div class="address-item-line"><strong>电话：</strong>{{item.phone}}</div>
        <div class="address-item-line">
          <strong>是否为默认地址：</strong>
          <strong :class="{'t_green': item.isDefault}">{{item.isDefault ? '是' : '否'}}</strong>
        </div>
        <div class="address-item-btn">
           <Button type="primary" shape="circle" icon="ios-create" @click="editAdress(index)">编辑</Button>
           <Button type="error" shape="circle" icon="md-trash" @click="deleteAddress(item._id)">删除</Button>
        </div>
      </div>
    </div>
    <div class="usercenter-empty" v-else>
      <div class="empty-icon"><i class="login-icon iconfont icon-chazhaoxiangsi"></i></div>
      <p class="empty-txt">你还没有填写收货地址喲~</p>
      <Button type="primary" size="large" shape="circle" @click="addAddress">去 添 加</Button>
    </div>
    <drawer-list
      :is-show="drawerShow"
      :title="drawerTitle"
      :data-info="addressInfo"
      :open-type="openType"
      @close="drawerShow = false"
      @sureSubmit="sureSubmit">
    </drawer-list>
  </div>
</template>

<script>
import * as AddressApi from '@/api/address'
import DrawerList from './DrawerList'
export default {
  data () {
    return {
      isEmpty: false,
      addressList: [],
      drawerShow: false,
      drawerTitle: '编辑地址',
      addressInfo: null,
      addressID: '',
      openType: 'add'
    }
  },
  components: {
    DrawerList
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.isEmpty = false
      AddressApi.GetAddress().then(res => {
        if (res.isSuccess) {
          this.addressList = res.result
        } else {
          this.$Message.error(res.errMsg)
        }
      }).catch(err => {
        this.isEmpty = true
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器休息中，请稍后重试')
        }
      })
    },
    // 新增地址
    addAddress () {
      this.drawerTitle = '新增地址'
      this.openType = 'add'
      this.drawerShow = true
      this.addressInfo = null
    },
    // 编辑地址
    editAdress (index) {
      this.drawerTitle = '编辑地址'
      this.openType = 'edit'
      this.drawerShow = true
      this.addressInfo = this.addressList[index]
      this.addressID = this.addressList[index]._id
    },
    // 确定修改
    sureSubmit (formData) {
      let postData = {
        nickName: formData.nickName,
        email: formData.email,
        detailAddress: formData.address,
        city: formData.city,
        phone: formData.phone
      }
      if (formData.isDefault === 'true') postData.isDefault = true
      if (this.openType === 'add') {
        AddressApi.AddAddress(postData).then(res => {
          this.handlerSuccess(res, '添加成功')
        }).catch(err => {
          this.handlerErr(err)
        })
      } else if (this.openType === 'edit') {
        postData.addressId = this.addressID
        AddressApi.EditAddress(postData).then(res => {
          this.handlerSuccess(res, '编辑成功')
        }).catch(err => {
          this.handlerErr(err)
        })
      }
    },
    handlerSuccess (res, str) {
      this.drawerShow = false
      if (res.isSuccess) {
        this.$Message.success(str)
        this.fetchData()
      } else {
        this.$Message.warning(res.errMsg)
      }
    },
    handlerErr (err) {
      this.drawerShow = false
      if (err.code >= 1000 & err.code <= 1002) {
        this.$Message.error('登录过期，请重新登录')
      } else {
        this.$Message.error('服务器休息中，请稍后重试')
      }
    },
    // 删除地址
    deleteAddress (id) {
      this.$Modal.confirm({
        title: '提示',
        okText: '确定',
        content: '<p>确定要删除这条地址吗？</p>',
        onOk: () => {
          AddressApi.DeleteAddress({ addressId: id }).then(res => {
            this.fetchData()
          }).catch(err => {
            if (err.code >= 1000 & err.code <= 1002) {
              this.$Message.error('登录过期，请重新登录')
            } else {
              this.$Message.error('服务器休息中，请稍后重试')
            }
          })
        }
      })
    }
  }
}
</script>
