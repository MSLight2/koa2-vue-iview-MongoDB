<template>
  <div class="col-md-4 col-xs-6">
    <div class="section-title">
      <h4 class="title">{{title}}</h4>
      <div class="section-nav">
        <div id="slick-nav-3" class="products-slick-nav">
          <button :class="['slick-prev', `top-prev${swiperId}`]" type="button">Previous</button>
          <button :class="['slick-next', `top-next${swiperId}`]" type="button">Next</button>
        </div>
      </div>
    </div>
    <div class="products-widget-slick">
      <Swiper 
        v-if="dataList.length > 0"
        :modules="swiperModules"
        centered-slides
        loop
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false
        }"
        :navigation="{
          nextEl: `.top-next${swiperId}`,
          prevEl: `.top-prev${swiperId}`
        }"
      >
        <SwiperSlide v-for="(itemInfo, index) in dataList" :key="index">
          <div>
            <div class="product-widget" v-for="(item, i) in itemInfo" :key="i">
              <div class="product-img">
                <img v-lazy="item.mainPicPath" alt="">
              </div>
              <div class="product-body" @click="goDetailPage(item.goodsId)">
                <p class="product-category">{{getGoodsType(item.goodsType)}}</p>
                <h3 class="product-name">{{item.title}}</h3>
                <h4 class="product-price">￥{{formatPrice(item.originalPrice)}}
                  <del class="product-old-price">￥{{formatPrice(item.showPrice)}}</del>
                </h4>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper';
import { getGoodsType, formatPrice } from '@/utils/utils'

const swiperModules = [Navigation, Autoplay];
const router = useRouter();

defineProps({
  title: {
    type: String,
    require: true,
    default: ''
  },
  swiperId: { type: Number, default: 1 },
  dataList: {
    type: Array<any>,
    require: true,
    default: () => []
  },
});

function goDetailPage (id: number) {
  router.push({
    name: 'detail',
    query: { id: id }
  })
}
</script>

<style scoped>
  .product-name{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .product-body{
    cursor: pointer;
  }
  .products-widget-slick{
    min-height: 270px;
  }
</style>