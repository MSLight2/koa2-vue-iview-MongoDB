<template>
  <div>
    <!--right-->
    <div class="col-md-5 col-md-push-2">
      <div id="product-main-img">
        <slick
          v-if="imgList.length > 0"
          ref="producMainSlick"
          :options="productMainImgSlickOption"
          @beforeChange="handleMainImgsBeforeChange">
            <div class="product-preview" v-for="(item, index) in imgList" :key="index">
              <zoom-on-hover
                :img-normal="item | filterImgUrl"
                :scale="2"
                :disabled="false">
              </zoom-on-hover>
            </div>
            <!--<div class="product-preview">
              <img src="@/assets/img/product03.png" alt="">
            </div>
            <div class="product-preview">
              <img src="@/assets/img/product06.png" alt="">
            </div>
            <div class="product-preview">
              <img src="@/assets/img/product08.png" alt="">
            </div>-->
        </slick>
      </div>
    </div>
    <!--left-->
    <div class="col-md-2  col-md-pull-5">
      <div id="product-imgs">
        <slick
          v-show="imgList.length > 0"
          ref="producSlick"
          :options="productImgSlickOption"
          @beforeChange="handleImgsBeforeChange">
            <div class="product-preview" v-for="(item, index) in imgList" :key="index">
              <img :src="item | filterImgUrlSmall" alt="">
            </div>
            <!--<div class="product-preview">
              <img src="@/assets/img/product03.png" alt="">
            </div>
            <div class="product-preview">
              <img src="@/assets/img/product06.png" alt="">
            </div>
            <div class="product-preview">
              <img src="@/assets/img/product08.png" alt="">
            </div>-->
        </slick>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick'
import ZoomOnHover from '@/components/smartComponent/ZoomOnHover'

export default {
  data () {
    return {
      productImgSlickOption: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: 0,
        vertical: true,
        // asNavFor: this.$refs.producMainSlick,
        responsive: [{
          breakpoint: 991,
          settings: {
            vertical: false,
            arrows: false,
            dots: true
          }
        }]
      },
      productMainImgSlickOption: {
        slidesToShow: 1,
        infinite: true,
        speed: 300,
        dots: false,
        arrows: true,
        fade: true
      }
    }
  },
  props: {
    imgList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  components: {
    Slick,
    ZoomOnHover
  },
  mounted () {
    this.slideInit()
  },
  methods: {
    // 初始化
    slideInit () {
      this.$nextTick(() => {
        if (this.$refs.producMainSlick !== undefined) {
          this.$refs.producMainSlick.reSlick()
          this.$refs.producSlick.reSlick()
        }
      })
    },
    // 主要展示图
    handleMainImgsBeforeChange (event, slick, currentSlide, nextSlide) {
      // this.productImgSlickOption.initialSlide = nextSlide
      // this.$refs.producSlick.reSlick()
      let isReload = false
      if (!nextSlide) {
        isReload = true
      }
      this.$refs.producSlick.goTo(nextSlide, isReload)
    },
    // 侧边slide展示图
    handleImgsBeforeChange (event, slick, currentSlide, nextSlide) {
      this.$refs.producMainSlick.goTo(nextSlide, false)
    }
  },
  filters: {
    filterImgUrlSmall (val) {
      if (val) {
        return val.replace(/_60x60.jpg/g, '_180x180.jpg')
      } else {
        return ''
      }
    },
    filterImgUrl (val) {
      if (val) {
        return val.replace(/_60x60.jpg/g, '_400x400.jpg')
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
  #product-imgs .product-preview{margin: 0 0;}
  #product-imgs .slick-current .product-preview{
    border-color: #D10024;
  }
</style>
