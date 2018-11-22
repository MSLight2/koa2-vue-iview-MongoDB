<template>
  <div>
    <bread-crumb :titles="breadCrumbTitles"></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="collection-title">商品收藏（{{pageTotal}}）</div>
          <div class="collection-main"  v-if="!isEmpty && collectionList.length > 0">
            <div class="collection-item" v-for="(item, index) in collectionList" :key="index">
              <div class="collection-img" v-lazy-container="{ selector: 'img' }">
                <img :data-src="item.goodsId_docs[0].mainPicPath | filterImgUrl" alt=""/>
                <div class="col-del-icon" @click="deleteCollection(item.goodsId)">
                  <i class="iconfont icon-shanchu" title="删除"></i>
                </div>
                <div class="col-icon-btm">
                  <div class="cib-icon" @click="checkDetail(item.goodsId)">
                    <i class="iconfont icon-xiangqingjingyanliebiaoshuxing"></i>
                    <span>查看详情</span>
                  </div>
                  <div class="cib-icon" @click="findSimilar(item.goodsId_docs[0].auctionURL)">
                    <i class="iconfont icon-chazhaoxiangsi"></i>
                    <span>找相似</span>
                  </div>
                </div>
              </div>
              <div class="collection-desc">
                <h4 class="title">{{item.goodsId_docs[0].title}}</h4>
                <p class="price">￥{{item.goodsId_docs[0].showPrice}}<del>￥{{item.goodsId_docs[0].discountPrice}}</del></p>
              </div>
            </div>
          </div>
          <!-- empty collection -->
          <div class="empty-collection" v-else>
            <div class="empty-icon"><i class="login-icon iconfont icon-chazhaoxiangsi"></i></div>
            <p class="empty-txt">收藏夹什么都没有~</p>
            <Button type="primary" size="large" shape="circle" @click="goBuy">去 添 加</Button>
          </div>
          <div class="store-filter clearfix" v-if="collectionList.length > 0">
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
      </div>
    </div>
    <footer-tmpl></footer-tmpl>
  </div>
</template>

<script>
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import BreadCrumb from '@/components/puppetComponent/BreadCrumb'
import IviewModal from '@/components/puppetComponent/Modal/IviewModal'
import * as CollectionApi from '@/api/collection'
import LoginStorage from '@/utils/login'

export default {
  data () {
    return {
      breadCrumbTitles: {
        titleArr: ['首页', '我的', '收藏夹'],
        path: []
      },
      collectionList: [],
      isEmpty: false,
      // 分页
      currentPage: 1,
      pageSize: 9,
      pageCount: 1,
      pageTotal: 0
    }
  },
  components: {
    NavBar,
    BreadCrumb,
    FooterTmpl
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      if (!LoginStorage.getToken()) {
        this.isEmpty = true
        return
      }
      this.isEmpty = false
      CollectionApi.GetCollectionList({ page: this.currentPage }).then(res => {
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
            this.$Message.success('收藏已删除')
            this.$store.dispatch('getCountAction')
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
    // 查看详情
    checkDetail (id) {
      window.open(`/detail?id=${id}`)
    },
    // 查找相似
    findSimilar (url) {
      window.open(url)
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
    }
  }
}
</script>

<style scoped>
  .empty-collection{
    margin: 50px 0;
    text-align: center;
  }
  .empty-collection button{
    width: 200px;
    height: 40px;
  }
  .empty-collection >>> .ivu-btn-primary{
    background-color: #D10024;
    border-color: #D10024;
    border: none;
    box-shadow: none;
  }
</style>
