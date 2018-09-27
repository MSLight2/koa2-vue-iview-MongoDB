<template>
  <div>
    <div class="col-md-2  col-md-pull-5">
      <div id="product-imgs" class="slick-initialized slick-slider slick-vertical">
        <div class="slick-list draggable">
          <div class="slick-track" style="height: 465px;">
            <swiper :options="productImgSwiperOption">
              <swiper-slide>
              <div class="product-preview slick-slide slick-cloned">
                <img src="@/assets/img/product01.png" alt="">
              </div>
              </swiper-slide>
              <swiper-slide>
              <div class="product-preview">
                <img src="@/assets/img/product03.png" alt="">
              </div>
              </swiper-slide>
              <swiper-slide>
              <div class="product-preview">
                <img src="@/assets/img/product06.png" alt="">
              </div>
              </swiper-slide>
              <swiper-slide>
              <div class="product-preview">
                <img src="@/assets/img/product08.png" alt="">
              </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="col-md-5 col-md-push-2">
      <div id="product-main-img">
        <div class="product-preview">
          <img src="@/assets/img/product01.png" alt="">
        </div>
        <div class="product-preview">
          <img src="@/assets/img/product03.png" alt="">
        </div>
        <div class="product-preview">
          <img src="@/assets/img/product06.png" alt="">
        </div>
        <div class="product-preview">
          <img src="@/assets/img/product08.png" alt="">
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      productImgSwiperOption: {
        slidesPerView: 3,
        direction: 'vertical',
        spaceBetween: 0,
        navigation: {
          // nextEl: '.slide-next',
          // prevEl: '.slide-prev'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
