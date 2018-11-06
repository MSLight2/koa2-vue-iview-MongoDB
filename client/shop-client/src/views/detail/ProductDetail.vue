<template>
  <div>
    <header-tmpl></header-tmpl>
    <bread-crumb :titles="breadCrumbTitles"></bread-crumb>
    <div class="section">
      <div class="container">
        <div class="row">
          <!-- Product main img -->
          <product-slide-img :img-list="imgList"></product-slide-img>
          <!-- Product details -->
          <product-detail-desc
            :data-info="goodDetailInfo"
            :evaluate-count="evaluateCount"
            @addEvaluate="gotoEvaluate">
          </product-detail-desc>
          <!-- Product tab -->
          <product-tab
            ref="productTab"
            :tab-index="tabIndex"
            :evaluate-data="evaluateInfoData"
            :data-info="goodDetailInfo"
            @tabChange="tabChange"
            @pageChange="pageChange"
            @evaluateSubmit="evaluateSubmit">
          </product-tab>
        </div>
      </div>
    </div>
    <related-products :data-list="relatedDataList"></related-products>
    <news-letter></news-letter>
    <footer-tmpl></footer-tmpl>
    <iview-modal
      :is-show="modalShow"
      type="warning"
      content="您还未登录，请登录后再操作"
      sureText="知道了"
      @close="modalShow = false">
    </iview-modal>
  </div>
</template>

<script>
import HeaderTmpl from '@/components/header/HeaderTmpl'
import FooterTmpl from '@/components/puppetComponent/FooterTmpl'
import NavBar from '@/components/puppetComponent/NavBar'
import BreadCrumb from '@/components/puppetComponent/BreadCrumb'
import ProductSlideImg from './children/ProductSlideImg'
import ProductDetailDesc from './children/ProductDetailDesc'
import ProductTab from './children/ProductTab'
import RelatedProducts from './children/RelatedProducts'
import NewsLetter from '@/components/puppetComponent/NewsLetter'
import * as GoodsApi from '@/api/goods'
import * as EvaluateApi from '@/api/evaluate'
import IviewModal from '@/components/puppetComponent/Modal/IviewModal'
import LoginStorage from '@/utils/login'

export default {
  data () {
    return {
      modalShow: false,
      goodsId: '',
      breadCrumbTitles: {
        titleArr: ['首页', '配件', '笔记本', '苹果电脑'],
        path: []
      },
      goodDetailInfo: {},
      evaluateInfoData: {},
      relatedDataList: [],
      imgList: [],
      tabIndex: 0
    }
  },
  components: {
    HeaderTmpl,
    NavBar,
    BreadCrumb,
    ProductSlideImg,
    ProductDetailDesc,
    ProductTab,
    RelatedProducts,
    NewsLetter,
    FooterTmpl,
    IviewModal
  },
  computed: {
    evaluateCount () {
      if (this.evaluateInfoData.starList !== undefined) {
        return this.evaluateInfoData.starList.length
      } else {
        return 0
      }
    }
  },
  mounted () {
    this.goodsId = this.$route.query.id
    if (this.goodsId) {
      this.getGoodsDetailData(this.goodsId)
      this.getEvaluateData(this.goodsId)
    } else {
      this.$Message.warning('你是真的皮╭(╯^╰)╮')
      setTimeout(() => {
        this.$router.go(-1)
      }, 3000)
    }
  },
  methods: {
    // 获取详情页数据
    getGoodsDetailData (id) {
      GoodsApi.GetGoodsDetail({ goodsId: id }).then(res => {
        this.goodDetailInfo = res.result
        this.imgList.push(res.result.mainPicPath)
        this.getGoodsInfoByCategoty()
      })
    },
    // 获取商品
    getGoodsInfoByCategoty () {
      let params = {
        goodsType: this.goodDetailInfo.goodsType,
        pageSize: 4
      }
      GoodsApi.GetGoodsByCategory(params).then(res => {
        this.relatedDataList = res.result
      })
    },
    // 获取评价
    getEvaluateData (id, page = 1, pageSize = 3) {
      let params = {
        goodsId: id,
        page: page,
        pageSize: pageSize
      }
      EvaluateApi.GetEvaluateList(params).then(res => {
        if (res.isSuccess) this.evaluateInfoData = res
      })
    },
    // 点击【我来评价】
    gotoEvaluate () {
      this.$refs.productTab.$el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
      this.tabIndex = 2
    },
    tabChange (index) {
      this.tabIndex = index
    },
    // 分页切换
    pageChange (page) {
      this.getEvaluateData(this.goodsId, page)
    },
    // 添加评价
    evaluateSubmit ({ nickName, userEmail, feedBack, startRate }) {
      if (!LoginStorage.getToken()) {
        this.$Message.error('请登录后在试！')
        return
      }
      let params = {
        goodsId: this.goodsId,
        nickName: nickName,
        email: userEmail,
        review: feedBack,
        rate: startRate
      }
      EvaluateApi.AddEvaluate(params).then(res => {
        if (res.errMsg) this.$Message.warning(res.errMsg)
        if (res.isSuccess) {
          this.$Message.success('评价成功')
          this.getEvaluateData(this.goodsId)
        }
      }).catch((err) => {
        if (err.code >= 1000 & err.code <= 1002) {
          this.modalShow = true
        } else {
          this.$Message.error('服务器不想理你，请稍后重试')
        }
      })
    }
  },
  watch: {
  }
}
</script>
