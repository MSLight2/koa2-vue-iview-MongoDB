<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <!-- section title -->
        <div class="col-md-12">
          <div class="section-title">
            <h3 class="title">新产品</h3>
            <div class="section-nav">
              <ul class="section-tab-nav tab-nav">
                <li class="active"><a data-toggle="tab" href="#tab1">笔记本</a></li>
                <li><a data-toggle="tab" href="#tab1">智能手机</a></li>
                <li><a data-toggle="tab" href="#tab1">照相机</a></li>
                <li><a data-toggle="tab" href="#tab1">配件</a></li>
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
                  <swiper :options="sSlideSwiperOption">
                      <!-- product -->
                      <swiper-slide v-for="item in 8" :key="item">
                        <product-item :data-info="dataInfo"></product-item>
                      </swiper-slide>
                  </swiper>
                </div>
                <div class="products-slick-nav">
                  <button class="slick-prev slide-prev" type="button">Previous</button>
                  <button class="slick-next slide-next" type="button">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ProductItem from '@/components/puppetComponent/ProductItem'
export default {
  data () {
    return {
      dataInfo: {},
      sSlideSwiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.slide-next',
          prevEl: '.slide-prev'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    ProductItem
  }
}
</script>

<style>
  .products-tabs .swiper-wrapper{
    padding-bottom: 60px;
  }
  .products-slick-nav{
    bottom: 40px;
  }
  .products-tabs .product{
    margin: 15px 2px;
  }
</style>
