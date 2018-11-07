<template>
  <div>
    <header-tmpl></header-tmpl>
    <bread-crumb :titles="breadCrumbTitles"></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <!-- ASIDE -->
          <store-aside
            :other-data="otherGoodsData"
            @sureFilter="sureFilter">
          </store-aside>
          <!-- STORE -->
          <store-list
            :data-list="goodsDataList"
            @filterChange="filterChange"
            @priceChange="priceChange">
              <Page
                slot="pagination"
                :current="currentPage"
                :page-size="pageSize"
                :total="pageTotal"
                @on-change="pageChange"
              />
          </store-list>
        </div>
      </div>
    </div>
    <news-letter></news-letter>
    <footer-tmpl></footer-tmpl>
  </div>
</template>

<script>
import HeaderTmpl from '@/components/header/HeaderTmpl'
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import NewsLetter from '@/components/puppetComponent/NewsLetter'
import BreadCrumb from '@/components/puppetComponent/BreadCrumb'
import StoreAside from './children/StoreAside'
import StoreList from './children/StoreList'
import * as GoodsApi from '@/api/goods'

export default {
  data () {
    return {
      breadCrumbTitles: {
        titleArr: ['首页', '笔记本', '电脑'],
        path: []
      },
      goodsType: null,
      goodsDataList: [],
      goodsTypeArr: [],
      searchWords: null,
      orderType: null,
      sortOrder: null,
      filterRange: null,
      minPrice: null,
      maxPrice: null,
      otherGoodsData: [],
      // 分页
      currentPage: 1,
      pageSize: 9,
      pageTotal: 0
    }
  },
  components: {
    HeaderTmpl,
    NavBar,
    BreadCrumb,
    NewsLetter,
    FooterTmpl,
    StoreAside,
    StoreList
  },
  mounted () {
    this.goodsType = this.$route.query.type
    if (this.goodsType) {
      this.goodsTypeArr = []
      this.goodsTypeArr.push(parseInt(this.goodsType))
      this.fetchData()
      this.getOtherGoods(parseInt(this.goodsType))
    } else {
      this.$Message.warning('你是真的皮╭(╯^╰)╮')
      setTimeout(() => {
        this.$router.go(-1)
      }, 3000)
    }
  },
  methods: {
    fetchData () {
      let params = {
        goodsType: JSON.stringify(this.goodsTypeArr),
        searchWords: this.searchWords,
        orderType: this.orderType,
        sortOrder: this.sortOrder,
        filterRange: this.filterRange,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      GoodsApi.GetGoodsList(params).then(res => {
        this.goodsDataList = res.result
        this.currentPage = res.paginationModule.page
        this.pageSize = res.paginationModule.pageSize
        this.pageTotal = res.paginationModule.total
      })
    },
    // 价格/销量
    filterChange (type) {
      this.currentPage = 1
      switch (type) {
        case 0:
          this.orderType = null
          this.sortOrder = null
          break;
        case 1:
          // 销量
          this.orderType = 0
          this.sortOrder = -1
          break
        case 2:
          // 价格
          this.orderType = 1
          this.sortOrder = 1
          break
      }
      this.fetchData()
    },
    // 价格筛选
    priceChange (type) {
      this.currentPage = 1
      switch (type) {
        case 0:
          this.filterRange = null
          break
        case 1:
          this.filterRange = '0-100'
          break
        case 2:
          this.filterRange = '100-500'
          break
        case 3:
          this.filterRange = '500-1000'
          break
        case 4:
          this.filterRange = '1000-5000'
          break
        case 5:
          this.filterRange = '5000-100000000'
          break
        default:
          this.filterRange = null
          break
      }
      this.fetchData()
    },
    sureFilter (goodsTypeArr, min, max) {
      console.log(goodsTypeArr)
    },
    // 分页切换
    pageChange (page) {
      this.currentPage = page
      this.fetchData()
    },
    // 其它商品
    getOtherGoods (type) {
      type += 1
      if (type === 6) type = 1
      let params = {
        goodsType: type,
        pageSize: 3
      }
      GoodsApi.GetGoodsByCategory(params).then(res => {
        this.otherGoodsData = res.result
      })
    }
  }
}
</script>
