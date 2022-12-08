<template>
  <div class="product spa">
    <div class="product-img"
      @click="checkDetail(dataInfo.goodsId)"
      :key="dataInfo.goodsId">
        <img v-lazy="getImgUrl(dataInfo.mainPicPath)" alt="">
    </div>
    <div class="product-body">
      <p class="product-category">{{getGoodsType(dataInfo.goodsType)}}</p>
      <h3 class="product-name">{{dataInfo.title}}</h3>
      <h4 class="product-price">￥{{formatPrice(dataInfo.originalPrice)}}
        <del class="product-old-price">￥{{formatPrice(dataInfo.showPrice)}}</del>
      </h4>
      <div class="product-rating">
        <i class="fa fa-star" v-for="item in starRate" :key="item"></i>
        <i class="fa fa-star no" v-for="i in (5 - starRate)" :key="i"></i>
      </div>
      <div class="product-btns">
        <button class="add-to-wishlist" @click="addToCollection(dataInfo.goodsId)">
          <i class="fa fa-heart-o"></i><span class="tooltipp">收藏</span>
        </button>
        <button class="add-to-compare" @click="findSimilar(dataInfo.auctionURL)">
          <i class="fa fa-exchange"></i><span class="tooltipp">找同款</span>
        </button>
        <button class="quick-view" @click="checkDetail(dataInfo.goodsId)">
          <i class="fa fa-eye"></i><span class="tooltipp">查看详情</span>
        </button>
      </div>
    </div>
    <div class="add-to-cart">
      <button class="add-to-cart-btn" @click="addToCart(dataInfo.goodsId)">
        <i class="fa fa-shopping-cart"></i>加入购物车
      </button>
    </div>
    <IviewModal
      :is-show="modalShow"
      type="warning"
      content="您还未登录，请登录后再操作"
      sureText="知道了"
      @close="modalShow = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import * as CollectionApi from '@/api/collection'
  import * as AddCartApi from '@/api/cart'
  import IviewModal from '@/components/IviewModal.vue';
  import LoginStorage from '@/utils/login'
  import { Message } from 'view-ui-plus';
  import { useUserStore } from '@/stores/user';
  import { getGoodsType, formatPrice } from '@/utils/utils'

  const modalShow = ref<boolean>(false);
  const userStore = useUserStore();

  const props = defineProps({
    dataInfo: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    }
  })

  const starRate = computed<number>(() => {
    if (props.dataInfo.goodRate) {
      return Math.round(Number(props.dataInfo.goodRate) / 100 * 5)
    }
    return 0
  })

  // 添加收藏
  const addToCollection = (id: number) => {
    if (!LoginStorage.getToken()) {
      Message.error('请登录后在试！')
      return
    }
    CollectionApi.AddCollection({ goodsId: id }).then((res: any) => {
      if (res.errMsg) Message.warning(res.errMsg)
      if (res.isSuccess) {
        userStore.getCountAction()
        Message.success('已收藏！')
      }
    }).catch((err: any) => {
      if (err.code >= 1000 && err.code <= 1002) {
        modalShow.value = true
      } else {
        Message.error('服务器不想理你，请稍后重试')
      }
    })
  }
  // 相似
  const findSimilar = (url: string) => {
    window.open(url)
  }
  // 查看详情
  const checkDetail = (id: number) => {
    window.open(`/detail?id=${id}`)
  }
  // 加入购物车
  const addToCart = (id: number) => {
    if (!LoginStorage.getToken()) {
      Message.error('请登录后在试！')
      return
    }
    let params = {
      goodsId: id,
      goodsNum: 1
    }
    AddCartApi.AddOrEditCart(params).then((res: any) => {
      if (res.errMsg) Message.warning(res.errMsg)
      if (res.isSuccess) {
        userStore.getCountAction()
        Message.success('商品已在购物车，等你呦(*╹▽╹*)！')
      }
    }).catch((err) => {
      if (err.code >= 1000 && err.code <= 1002) {
        modalShow.value = true
      } else {
        Message.error('服务器休息中，请稍后重试')
      }
    })
  }
  const getImgUrl = (val: string | undefined) => {
    if (val) {
      return val.replace(/_60x60.jpg/g, '_240x240.jpg')
    } else {
      return '--'
    }
  }
</script>

<style scoped>
  .product-img{
    max-height: 260px;
    cursor: pointer;
  }
  .spa .product-name{
    height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .product .product-body .product-rating>i.no{
    color: #eee;
  }
</style>