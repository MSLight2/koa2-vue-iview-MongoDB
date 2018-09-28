<template>
  <div>
    <!--right-->
    <div class="col-md-5 col-md-push-2">
      <div id="product-main-img">
        <slick
          ref="producMainSlick"
          :options="productMainImgSlickOption"
          @beforeChange="handleMainImgsBeforeChange">
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
        </slick>
      </div>
    </div>
    <!--left-->
    <div class="col-md-2  col-md-pull-5">
      <div id="product-imgs">
        <slick
          ref="producSlick"
          :options="productImgSlickOption"
          @beforeChange="handleImgsBeforeChange">
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
        </slick>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick'

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
  components: {
    Slick
  },
  mounted () {
    this.slideInit()
  },
  methods: {
    // 初始化
    slideInit () {
      this.$nextTick(() => {
        this.$refs.producMainSlick.reSlick()
        this.$refs.producSlick.reSlick()
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
      // this.productMainImgSlickOption.initialSlide = nextSlide
      // this.$refs.producMainSlick.reSlick()
      this.$refs.producMainSlick.goTo(nextSlide, false)
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
