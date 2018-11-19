<template>
  <div>
    <header-tmpl></header-tmpl>
    <bread-crumb :titles="breadCrumbTitles"></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="collection-title">商品收藏（20）</div>
          <div class="collection-main">
            <div class="collection-item" v-for="index in 20">
              <div class="collection-img">
                <img v-lazy="'http://g.search1.alicdn.com/img/bao/uploaded/i4/i3/3081047815/O1CN0127bJibgaByoZAGQ_!!0-item_pic.jpg_240x240.jpg'" alt=""/>
                <div class="col-del-icon"><i class="iconfont icon-shanchu"></i></div>
                <div class="col-icon-btm">
                  <div class="cib-icon"><i class="iconfont icon-xiangqingjingyanliebiaoshuxing"></i>查看详情</div>
                  <div class="cib-icon"><i class="iconfont icon-chazhaoxiangsi"></i>找相似</div>
                </div>
              </div>
              <div class="collection-desc">
                <h4 class="title">【立省50元】天猫精灵方糖 智能音箱AI语音助手蓝牙音响</h4>
                <p class="price">￥199<del>￥189</del></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-tmpl></footer-tmpl>
  </div>
</template>

<script>
import HeaderTmpl from '@/components/header/HeaderTmpl'
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import BreadCrumb from '@/components/puppetComponent/BreadCrumb'
import * as CollectionApi from '@/api/collection'
import LoginStorage from '@/utils/login'

export default {
  data () {
    return {
      modalShow: false,
      breadCrumbTitles: {
        titleArr: ['首页', '我的', '收藏夹'],
        path: []
      },
      CollectionList: [],
      isEmpty: false
    }
  },
  components: {
    HeaderTmpl,
    NavBar,
    BreadCrumb,
    FooterTmpl
  },
  mounted () {
    // this.fetchData()
  },
  methods: {
    fetchData () {
      if (!LoginStorage.getToken()) {
        this.isEmpty = true
        return
      }
      this.isEmpty = false
      CartApi.GetCartList().then(res => {
      }).catch((err) => {
        this.isEmpty = true
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器不想理你，请稍后重试')
        }
      })
    },
  },
  filters: {
    filterImgUrl (val) {
      if (val) {
        return val.replace(/_60x60.jpg/g, '_120x120.jpg')
      } else {
        return '--'
      }
    }
  }
}
</script>

<style scoped>
</style>
