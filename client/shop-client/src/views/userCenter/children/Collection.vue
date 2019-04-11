<template>
  <div>
    <h3 class="user-h3">个人收藏</h3>
    <div class="collection-box" v-if="!isEmpty && collectionList.length > 0">
      <div class="collection-user-item" v-for="(item, index) in collectionList" :key="index">
        <div class="collection-item-detail">
          <div class="collection-item-desc" v-lazy-container="{ selector: 'img' }">
            <div class="img">
              <img :data-src="item.goodsId_docs[0].mainPicPath | filterImgUrl" alt="">
            </div>
            <div class="detail">
              <p class="title">{{item.goodsId_docs[0].title}}</p>
              <div class="price">
                <strong>￥{{item.goodsId_docs[0].showPrice}}</strong>
                <del>￥{{item.goodsId_docs[0].discountPrice}}</del></div>
            </div>
          </div>
          <div class="collection-item-time">收藏时间：{{item.collectionTime | formatDate}}</div>
          <div class="collection-item-icon" @click="deleteCollection(item.goodsId)">
            <i class="iconfont icon-shanchu" title="删除"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="usercenter-empty" v-else>
      <div class="empty-icon"><i class="login-icon iconfont icon-chazhaoxiangsi"></i></div>
      <p class="empty-txt">空空如也~</p>
      <Button type="primary" size="large" shape="circle" @click="goBuy">去 收 藏</Button>
    </div>
    <div class="user-store-filter" v-if="collectionList.length > 0">
      <ul class="store-pagination">
        <Page
          v-if="pageCount > 1"
          :current="currentPage"
          :page-size="pageSize"
          :total="pageTotal"
          @on-change="pageChange"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import * as CollectionApi from '@/api/collection'
import moment from 'moment'
export default {
  data () {
    return {
      isEmpty: false,
      collectionList: [],
      // 分页
      currentPage: 1,
      pageSize: 6,
      pageCount: 1,
      pageTotal: 0
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.isEmpty = false
      CollectionApi.GetCollectionList({
        page: this.currentPage,
        pageSize: 6
      }).then(res => {
        this.collectionList = res.result
        this.currentPage = res.paginationModule.page
        this.pageSize = res.paginationModule.pageSize
        this.pageCount = res.paginationModule.pageCount
        this.pageTotal = res.paginationModule.total
      }).catch((err) => {
        this.isEmpty = true
        if (err.code >= 1000 & err.code <= 1002) {
          this.$Message.error('登录过期，请重新登录')
        } else {
          this.$Message.error('服务器休息中，请稍后重试')
        }
      })
    },
    // 删除收藏
    deleteCollection (id) {
      this.$Modal.confirm({
        title: '提示',
        okText: '是的',
        content: '<p>亲！确定要删除吗？o(╥﹏╥)o</p>',
        onOk: () => {
          CollectionApi.DeleteCollection({ goodsId: id }).then(res => {
            this.currentPage = 1
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
    },
    // 分页切换
    pageChange (page) {
      this.currentPage = page
      this.fetchData()
    },
    goBuy () {
      this.$router.replace({ name: 'home' })
    }
  },
  filters: {
    filterImgUrl (val) {
      if (val) {
        return val.replace(/_60x60.jpg/g, '_180x180.jpg')
      } else {
        return '--'
      }
    },
    formatDate (val) {
      if (val) {
        return moment(parseInt(val)).format('YYYY-MM-DD HH:mm')
      } else {
        return '无'
      }
    }
  }
}
</script>
