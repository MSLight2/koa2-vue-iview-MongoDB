<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <!-- section title -->
        <div class="col-md-12">
          <div class="section-title">
            <h3 class="title">{{titleConfig.title}}</h3>
            <div class="section-nav">
              <ul class="section-tab-nav tab-nav">
                <li
                  v-for="(item, index) in titleConfig.categories"
                  :key="index"
                  @click="tabSwitch(index)"
                  :class="{'active': index === currentTabIndex}">
                    <a href="javascript:;">{{item}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Products tab & slick -->
        <div class="col-md-12">
          <div class="row">
            <div class="products-tabs">
              <!-- tab -->
              <div class="tab-pane active fade">
                <div class="products-slick">
                  <Swiper
                    v-if="dataList.length > 0"
                    :modules="swiperModules"
                    :slides-per-view="4"
                    :space-between="50"
                    :autoplay="{
                      delay: 5000,
                      disableOnInteraction: false
                    }"
                    :navigation="{
                      nextEl: `.slide-next${swiperId}`,
                      prevEl: `.slide-prev${swiperId}`
                    }"
                  >
                    <SwiperSlide
                      class="swiper-slide"
                      v-for="(item, index) in dataList"
                      :key="index"
                    >
                      <product-item :data-info="item"></product-item>
                    </SwiperSlide>
                  </Swiper>
                  <div class="progressive-load" v-else>
                    <div class="load-item" v-for="index in 4" :key="index">
                      <div class="load-img"></div>
                      <div class="load-t"></div>
                      <div class="load-p"></div>
                    </div>
                  </div>
                </div>
                <div class="products-slick-nav">
                  <button :class="['slick-prev', `slide-prev${swiperId}`]" type="button">Previous</button>
                  <button :class="['slick-next', `slide-next${swiperId}`]" type="button">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ProductItem from '@/components/ProductItem.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper';

const swiperModules = [Navigation, Autoplay];
const currentTabIndex = ref<number>(0);

defineProps({
  swiperId: { type: Number, default: 1 },
  titleConfig: {
    type: Object,
    require: true,
    default: () => {
      return {
        title: '',
        categories: []
      }
    }
  },
  dataList: {
    type: Array<any>,
    require: true,
    default: () => []
  }
});
const emit = defineEmits<{
  (e: 'tabSwitch', index: number): void
}>();

const tabSwitch = (index:number) => {
  currentTabIndex.value = index;
  emit('tabSwitch', index);
}

</script>

<style lang="less">
  .products-tabs{
    .swiper-wrapper{
      padding-bottom: 60px;
    }
    .product{
      margin: 15px 2px;
    }
  }
  .products-slick-nav{
    bottom: 40px;
  }
  .products-slick{
    min-height: 520px;
  }
  .progressive-load{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    .load-item{
      width: 260px;
      height: 450px;
      background: #fbfbfb;
      display: flex;
      flex-direction: column;
    }
    .load-img{
      width: 240px;
      height: 240px;
      background: #f1f0f0;
      margin: 0 auto;
      margin-top: 10px;
    }
    .load-t, .load-p{
      width: 200px;
      height: 35px;
      margin-top: 20px;
      margin-left: 10px;
      background: #f1f0f0;
    }
    .load-p{
      width: 120px;
    }
  }
</style>