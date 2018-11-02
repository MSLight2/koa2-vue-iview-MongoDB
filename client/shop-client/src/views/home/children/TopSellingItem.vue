<template>
  <div class="col-md-4 col-xs-6">
    <div class="section-title">
      <h4 class="title">家电</h4>
      <div class="section-nav">
        <div id="slick-nav-3" class="products-slick-nav">
          <button class="slick-prev slick-prev1" type="button">Previous</button>
          <button class="slick-next slick-next1" type="button">Next</button>
        </div>
      </div>
    </div>
    <div class="products-widget-slick">
      <swiper :options="setSwiperName[swiperName]">
        <swiper-slide>
          <div>
            <!-- product widget -->
            <div class="product-widget">
              <div class="product-img">
                <img src="@/assets/img/product07.png" alt="">
              </div>
              <div class="product-body">
                <p class="product-category">Category</p>
                <h3 class="product-name"><a href="#">product name goes here</a></h3>
                <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
              </div>
            </div>
            <div class="product-widget">
              <div class="product-img">
                <img src="@/assets/img/product08.png" alt="">
              </div>
              <div class="product-body">
                <p class="product-category">Category</p>
                <h3 class="product-name"><a href="#">product name goes here</a></h3>
                <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
              </div>
            </div>
            <div class="product-widget">
              <div class="product-img">
                <img src="@/assets/img/product09.png" alt="">
              </div>
              <div class="product-body">
                <p class="product-category">Category</p>
                <h3 class="product-name"><a href="#">product name goes here</a></h3>
                <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <!-- product widget -->
            <div class="product-widget">
              <div class="product-img">
                <img src="@/assets/img/product01.png" alt="">
              </div>
              <div class="product-body">
                <p class="product-category">Category</p>
                <h3 class="product-name"><a href="#">product name goes here</a></h3>
                <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
              </div>
            </div>
            <div class="product-widget">
              <div class="product-img">
                <img src="@/assets/img/product02.png" alt="">
              </div>
              <div class="product-body">
                <p class="product-category">Category</p>
                <h3 class="product-name"><a href="#">product name goes here</a></h3>
                <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
              </div>
            </div>
            <div class="product-widget">
              <div class="product-img">
                <img src="@/assets/img/product03.png" alt="">
              </div>
              <div class="product-body">
                <p class="product-category">Category</p>
                <h3 class="product-name"><a href="#">product name goes here</a></h3>
                <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultSwiperOption: {
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.slick-next1',
          prevEl: '.slick-prev1'
        }
      }
    }
  },
  computed: {
    setSwiperName () {
      if (this.swiperName !== 'undefined') {
        let _this = this
        return {
          [this.swiperName]: {
            centeredSlides: true,
            loop: true,
            autoplay: {
              delay: 3500,
              disableOnInteraction: false
            },
            navigation: {
              nextEl: `.${_this.swiperName}-next`,
              prevEl: `.${_this.swiperName}-prev`
            }
          }
        }
      }
      return this.defaultSwiperOption
    }
  },
  props: {
    dataList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  swiperName: {
    type: String,
    require: true,
    default: 'slide'
  }
}
</script>
