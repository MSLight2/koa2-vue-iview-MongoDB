<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <!-- section title -->
        <div class="col-md-12">
          <div class="section-title">
            <h3 class="title">New Products</h3>
            <div class="section-nav">
              <ul class="section-tab-nav tab-nav">
                <li class="active"><a data-toggle="tab" href="#tab1">Laptops</a></li>
                <li><a data-toggle="tab" href="#tab1">Smartphones</a></li>
                <li><a data-toggle="tab" href="#tab1">Cameras</a></li>
                <li><a data-toggle="tab" href="#tab1">Accessories</a></li>
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
                      <swiper-slide>
                        <div class="product">
                          <div class="product-img">
                            <img src="@/assets/img/product01.png" alt="">
                            <div class="product-label">
                              <span class="sale">-30%</span>
                              <span class="new">NEW</span>
                            </div>
                          </div>
                          <div class="product-body">
                            <p class="product-category">Category</p>
                            <h3 class="product-name"><a href="#">product name goes here</a></h3>
                            <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                            <div class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                            </div>
                            <div class="product-btns">
                              <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                              <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                              <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                            </div>
                          </div>
                          <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                          </div>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="product">
                          <div class="product-img">
                            <img src="@/assets/img/product02.png" alt="">
                            <div class="product-label">
                              <span class="new">NEW</span>
                            </div>
                          </div>
                          <div class="product-body">
                            <p class="product-category">Category</p>
                            <h3 class="product-name"><a href="#">product name goes here</a></h3>
                            <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                            <div class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star-o"></i>
                            </div>
                            <div class="product-btns">
                              <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                              <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                              <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                            </div>
                          </div>
                          <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                          </div>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="product">
                          <div class="product-img">
                            <img src="@/assets/img/product03.png" alt="">
                            <div class="product-label">
                              <span class="sale">-30%</span>
                            </div>
                          </div>
                          <div class="product-body">
                            <p class="product-category">Category</p>
                            <h3 class="product-name"><a href="#">product name goes here</a></h3>
                            <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                            <div class="product-rating">
                            </div>
                            <div class="product-btns">
                              <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                              <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                              <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                            </div>
                          </div>
                          <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                          </div>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="product">
                          <div class="product-img">
                            <img src="@/assets/img/product04.png" alt="">
                          </div>
                          <div class="product-body">
                            <p class="product-category">Category</p>
                            <h3 class="product-name"><a href="#">product name goes here</a></h3>
                            <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                            <div class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                            </div>
                            <div class="product-btns">
                              <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                              <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                              <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                            </div>
                          </div>
                          <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                          </div>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="product">
                          <div class="product-img">
                            <img src="@/assets/img/product05.png" alt="">
                          </div>
                          <div class="product-body">
                            <p class="product-category">Category</p>
                            <h3 class="product-name"><a href="#">product name goes here</a></h3>
                            <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
                            <div class="product-rating">
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                            </div>
                            <div class="product-btns">
                              <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                              <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                              <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                            </div>
                          </div>
                          <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                          </div>
                        </div>
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
export default {
  data () {
    return {
      sSlideSwiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.slide-prev',
          prevEl: '.slide-next'
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
