<template>
  <div>
    <h3 class="user-h3">地址</h3>
    <div class="user-add-address">
      <Button type="primary" shape="circle" icon="md-add" @click="addAddress">新增地址</Button>
    </div>
    <div class="address-box">
      <div class="address-item" v-for="(item, index) in addressList" :key="index">
        <div class="address-item-detail">{{item.detailAddress}}</div>
        <div class="address-item-line"><strong>昵称：</strong>{{item.nickName}}</div>
        <div class="address-item-line"><strong>电话：</strong>{{item.phone}}</div>
        <div class="address-item-line">
          <strong>是否为默认地址：</strong>
          <strong :class="{'t_green': item.isDefault}">{{item.isDefault ? '是' : '否'}}</strong>
        </div>
        <div class="address-item-btn">
           <Button type="primary" shape="circle" icon="ios-create" @click="editAdress(item._id)">编辑</Button>
           <Button type="error" shape="circle" icon="md-trash" @click="deleteAddress(item._id)">删除</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as AddressApi from '@/api/address'
export default {
  data () {
    return {
      addressList: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      AddressApi.GetAddress().then(res => {
        if (res.isSuccess) {
          this.addressList = res.result
        } else {
          this.$Message.error(res.errMsg)
        }
      }).catch(err => {
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器休息中，请稍后重试')
        }
      })
    },
    // 新增地址
    addAddress () {
    },
    // 编辑地址
    editAdress () {
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
