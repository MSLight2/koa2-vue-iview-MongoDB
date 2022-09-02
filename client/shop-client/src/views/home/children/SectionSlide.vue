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
                  <swiper :options="sSlideSwiperOption" v-if="dataList.length > 0">
                    <!-- product -->
                    <swiper-slide v-for="(item, index) in dataList" :key="index">
                      <product-item :data-info="item"></product-item>
                    </swiper-slide>
                  </swiper>
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

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ProductItem from '@/components/puppetComponent/ProductItem'

export default {
  data () {
    return {
      dataInfo: {},
      currentTabIndex: 0,
      sSlideSwiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: `.slide-next${this.swiperId}`,
          prevEl: `.slide-prev${this.swiperId}`
        }
      }
    }
  },
  props: {
    swiperId: {
      type: Number,
      default: 1
    },
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
      type: Array,
      require: true,
      default: () => []
    }
  },
  components: {
    swiper,
    swiperSlide,
    ProductItem
  },
  methods: {
    tabSwitch (index) {
      this.currentTabIndex = index
      this.$emit('tabSwitch', index)
    }
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
  .products-slick{
    min-height: 520px;
  }
  /* progressive load */
  .progressive-load{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
  }
  .progressive-load .load-item{
    width: 260px;
    height: 450px;
    background: #fbfbfb;
    display: flex;
    flex-direction: column;
  }
  .progressive-load .load-img{
    width: 240px;
    height: 240px;
    background: #f1f0f0;
    margin: 0 auto;
    margin-top: 10px;
  }
  .progressive-load .load-t,
  .progressive-load .load-p{
    width: 200px;
    height: 35px;
    margin-top: 20px;
    margin-left: 10px;
    background: #f1f0f0;
  }
  .progressive-load .load-p{
    width: 120px;
  }
</style>
