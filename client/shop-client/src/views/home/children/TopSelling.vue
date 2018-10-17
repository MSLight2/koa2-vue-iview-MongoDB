<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <!-- 家电 -->
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
            <swiper :options="swiperOption1">
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
        <!-- 像机 -->
        <div class="col-md-4 col-xs-6">
          <div class="section-title">
            <h4 class="title">像机</h4>
            <div class="section-nav">
              <div id="slick-nav-4" class="products-slick-nav">
                <button class="slick-prev slick-prev2" type="button">Previous</button>
                <button class="slick-next slick-next2" type="button">Next</button>
              </div>
            </div>
          </div>
          <div class="products-widget-slick">
            <swiper :options="swiperOption2">
              <swiper-slide>
                <div>
                  <div class="product-widget">
                    <div class="product-img">
                      <img src="@/assets/img/product04.png" alt="">
                    </div>
                    <div class="product-body">
                      <p class="product-category">Category</p>
                      <h3 class="product-name"><a href="#">product name goes here</a></h3>
                      <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                    </div>
                  </div>
                  <div class="product-widget">
                    <div class="product-img">
                      <img src="@/assets/img/product05.png" alt="">
                    </div>
                    <div class="product-body">
                      <p class="product-category">Category</p>
                      <h3 class="product-name"><a href="#">product name goes here</a></h3>
                      <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                    </div>
                  </div>
                  <div class="product-widget">
                    <div class="product-img">
                      <img src="@/assets/img/product06.png" alt="">
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
            </swiper>
          </div>
        </div>
        <!-- 耳机 -->
        <div class="col-md-4 col-xs-6">
          <div class="section-title">
            <h4 class="title">耳机</h4>
            <div class="section-nav">
              <div id="slick-nav-4" class="products-slick-nav">
                <button class="slick-prev slick-prev3" type="button">Previous</button>
                <button class="slick-next slick-next3" type="button">Next</button>
              </div>
            </div>
          </div>
          <div class="products-widget-slick">
            <swiper :options="swiperOption3">
              <swiper-slide>
                <div>
                  <div class="product-widget">
                    <div class="product-img">
                      <img src="@/assets/img/product04.png" alt="">
                    </div>
                    <div class="product-body">
                      <p class="product-category">Category</p>
                      <h3 class="product-name"><a href="#">product name goes here</a></h3>
                      <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                    </div>
                  </div>
                  <div class="product-widget">
                    <div class="product-img">
                      <img src="@/assets/img/product05.png" alt="">
                    </div>
                    <div class="product-body">
                      <p class="product-category">Category</p>
                      <h3 class="product-name"><a href="#">product name goes here</a></h3>
                      <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                    </div>
                  </div>
                  <div class="product-widget">
                    <div class="product-img">
                      <img src="@/assets/img/product06.png" alt="">
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
            </swiper>
          </div>
        </div>

      </div>
      <!--end row-->
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      swiperOption1: {
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
      },
      swiperOption2: {
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.slick-next2',
          prevEl: '.slick-prev2'
        }
      },
      swiperOption3: {
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.slick-next3',
          prevEl: '.slick-prev3'
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
