<template>
  <div>
    <NavBar :activeCategory="0" />
    <SectionShop @buyNow="sectionBuyNow" />
    <SectionSlide
      :titleConfig="configHot"
      :dataList="state.hotInfoData"
      @tabSwitch="tabSwitch">
    </SectionSlide>
    <HotDetail @buyNow="hotBuyNow" />
    <SectionSlide
      :swiperId="2"
      :titleConfig="configRecommend"
      :dataList="state.recommendInfoData"
      @tabSwitch="tabSwitchTwo">
    </SectionSlide>
    <TopSellingVue
      :houesDataList="state.houseInfoData"
      :cameraDataList="state.cameraInfoData"
      :phoneDataList="state.phoneInfoData"
    />
    <NewsLetter />
    <FooterTmpl />
    <IviewModal
      :is-show="state.modalShow"
      :type="state.modalType"
      :content="state.modelContent"
      :sureText="state.modalSureText"
      @close="state.modalShow = false"
    />
  </div>
</template>

<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue';
  import FooterTmpl from '@/components/Footer.vue'
  import HotDetail from './components/HotDetail.vue'
  import SectionSlide from './components/SectionSlide.vue'
  import TopSellingVue from './components/TopSelling.vue';
  import NewsLetter from '@/components//NewsLetter.vue'
  import SectionShop from './components/SectionShop.vue'
  import IviewModal from '@/components/IviewModal.vue'
  import * as GoodsApi from '@/api/goods'
  import StorageUtils from '@/utils/Storage'
  import { onMounted, shallowReactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Notice } from 'view-ui-plus';

  const router = useRouter();

  const configHot = {
    title: '热卖',
    categories: ['AI', '手机', '耳机']
  }
  const configRecommend = {
    title: '推荐',
    categories: ['高配电脑', '智能手机', 'AI智能家电', '相机']
  }

  const state = shallowReactive({
    modalShow: false,
    modalType: 'warning',
    modelContent: '',
    modalSureText: '确定',
    categoryType: 0,
    hotInfoData: [],
    recommendInfoData: [],
    // 头部数据
    collectionInfoData: {},
    shopCartInfoData: {},
    // 底部数据
    houseInfoData: [],
    cameraInfoData: [],
    phoneInfoData: []
  })

  onMounted(() => {
    initData()
    if (!StorageUtils.getSessionStorage('elecNoticeClose', true)) {
      // showNotice()
    }
  })

  // 通过类目获取商品数
  const getGoodsInfoByCategoty = ({ type = 1, size = 12 }, fn: Function) => {
    let params = {
      goodsType: type,
      pageSize: size
    }
    GoodsApi.GetGoodsByCategory(params).then(res => {
      if (fn) fn(res)
    })
  }
  const initData = () => {
    // 热卖
    getGoodsInfoByCategoty({ type: 6 }, (res: { result: never[]; }) => {
      state.hotInfoData = res.result
    })
    // 推荐
    getGoodsInfoByCategoty({ type: 1 }, (res: { result: never[]; }) => {
      state.recommendInfoData = res.result
    })
    // 底部 家电-相机-耳机
    getGoodsInfoByCategoty({ type: 5, size: 9 }, (res: { result: never[]; }) => {
      state.houseInfoData = res.result
    })
    getGoodsInfoByCategoty({ type: 4, size: 9 }, (res: { result: never[]; }) => {
      state.cameraInfoData = res.result
    })
    getGoodsInfoByCategoty({ type: 3, size: 9 }, (res: { result: never[]; }) => {
      state.phoneInfoData = res.result
    })
  }
  // 立即购买
  const sectionBuyNow = (type: number) => {
    router.push({
      name: 'store',
      query: { type: type }
    })
  }
  const tabSwitch = (index: number) => {
    let goodsType = 6
    if (index === 0) goodsType = 6
    if (index === 1) goodsType = 2
    if (index === 2) goodsType = 3
    getGoodsInfoByCategoty({ type: goodsType }, (res: { result: never[]; }) => {
      state.hotInfoData = res.result
    })
  }
  const tabSwitchTwo = (index: number) => {
    let goodsType = 1
    if (index === 0) goodsType = 1
    if (index === 1) goodsType = 2
    if (index === 2) goodsType = 5
    if (index === 3) goodsType = 4
    getGoodsInfoByCategoty({ type: goodsType }, (res: { result: never[]; }) => {
      state.recommendInfoData = res.result
    })
  }
  // 畅销购买
  const hotBuyNow = () => {
    router.push({
      name: 'store',
      query: { type: Math.floor(Math.random() * 6 + 1) }
    })
  }
  // 展示通知
  function showNotice() {
    try {
      Notice.warning({
        title: '使用声明',
        desc: '此网站只是个Demo，模板来源网络，没有实际支付功能，仅供学习参考！请勿它用',
        duration: 1000,
        onClose () {
          StorageUtils.setSessionStorage('elecNoticeClose', true)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
</script>

<style scoped lang="less">
  body{
    line-height: inherit;
  }
</style>