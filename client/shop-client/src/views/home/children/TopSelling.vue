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
            <swiper :options="swiperOption1" v-if="houesDataList.length > 0">
              <swiper-slide v-for="(itemInfo, index) in houseDataArray" :key="index">
                <div>
                  <!-- product widget -->
                  <div class="product-widget" v-for="(item, i) in itemInfo" :key="i">
                    <div class="product-img">
                      <img v-lazy="item.mainPicPath" alt="">
                    </div>
                    <div class="product-body" @click="goDetailPage(item.goodsId)">
                      <p class="product-category">{{item.goodsType | filterGoodsType}}</p>
                      <h3 class="product-name">{{item.title}}</h3>
                      <h4 class="product-price">￥{{item.originalPrice | formatPrice}}
                        <del class="product-old-price">￥{{item.showPrice | formatPrice}}</del>
                      </h4>
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
            <swiper :options="swiperOption2" v-if="cameraDataList.length > 0">
              <swiper-slide v-for="(itemInfo, index) in cameraDataArray" :key="index">
                <div>
                  <!-- product widget -->
                  <div class="product-widget" v-for="(item, i) in itemInfo" :key="i">
                    <div class="product-img">
                      <img v-lazy="item.mainPicPath" alt="">
                    </div>
                    <div class="product-body" @click="goDetailPage(item.goodsId)">
                      <p class="product-category">{{item.goodsType | filterGoodsType}}</p>
                      <h3 class="product-name">{{item.title}}</h3>
                      <h4 class="product-price">￥{{item.originalPrice | formatPrice}}
                        <del class="product-old-price">￥{{item.showPrice | formatPrice}}</del>
                      </h4>
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
            <swiper :options="swiperOption3" v-if="phoneDataList.length > 0">
              <swiper-slide v-for="(itemInfo, index) in phoneDataArray" :key="index">
                <div>
                  <!-- product widget -->
                  <div class="product-widget" v-for="(item, i) in itemInfo" :key="i">
                    <div class="product-img">
                      <img v-lazy="item.mainPicPath" alt="">
                    </div>
                    <div class="product-body" @click="goDetailPage(item.goodsId)">
                      <p class="product-category">{{item.goodsType | filterGoodsType}}</p>
                      <h3 class="product-name">{{item.title}}</h3>
                      <h4 class="product-price">￥{{item.originalPrice | formatPrice}}
                        <del class="product-old-price">￥{{item.showPrice | formatPrice}}</del>
                      </h4>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
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
      houseDataArray: [],
      cameraDataArray: [],
      phoneDataArray: [],
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
  },
  props: {
    houesDataList: {
      type: Array,
      require: true,
      default: () => []
    },
    cameraDataList: {
      type: Array,
      require: true,
      default: () => []
    },
    phoneDataList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  methods: {
    goDetailPage (id) {
      this.$router.push({
        name: 'detail',
        query: { id: id }
      })
    }
  },
  watch: {
    houesDataList () {
      let tempArray = []
      this.houesDataList.forEach((item, index) => {
        tempArray.push(item)
        if ((index + 1) % 3 === 0) {
          this.houseDataArray.push(tempArray)
          tempArray = []
        }
      })
      this.swiperOption1.loop = true
    },
    cameraDataList () {
      let tempArray = []
      this.cameraDataList.forEach((item, index) => {
        tempArray.push(item)
        if ((index + 1) % 3 === 0) {
          this.cameraDataArray.push(tempArray)
          tempArray = []
        }
      })
    },
    phoneDataList () {
      let tempArray = []
      this.phoneDataList.forEach((item, index) => {
        tempArray.push(item)
        if ((index + 1) % 3 === 0) {
          this.phoneDataArray.push(tempArray)
          tempArray = []
        }
      })
    }
  },
  filters: {
    filterGoodsType (val) {
      switch (val) {
        case 1:
          return '电脑'
        case 2:
          return '智能手机'
        case 3:
          return '耳机'
        case 4:
          return '相机'
        case 5:
          return '家电'
        case 6:
          return 'AI智能'
        default:
          return ''
      }
    },
    formatPrice (val) {
      if (val) {
        return Number(val).toFixed(2)
      } else {
        return '0.00'
      }
    }
  }
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
