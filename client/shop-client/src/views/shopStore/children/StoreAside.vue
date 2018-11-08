<template>
  <div id="aside" class="col-md-3">
    <!-- categories -->
    <div class="aside">
      <h3 class="aside-title">分类</h3>
      <div class="checkbox-filter">
        <div class="input-checkbox">
          <input type="checkbox" :value="1" id="category-1" v-model="goodsTypeCheck">
          <label for="category-1">
            <span></span>
            电脑
          </label>
        </div>
        <div class="input-checkbox">
          <input type="checkbox" :value="2" id="category-2" v-model="goodsTypeCheck">
          <label for="category-2">
            <span></span>
            智能手机
          </label>
        </div>
        <div class="input-checkbox">
          <input type="checkbox" :value="3" id="category-3" v-model="goodsTypeCheck">
          <label for="category-3">
            <span></span>
            耳机
          </label>
        </div>
        <div class="input-checkbox">
          <input type="checkbox" :value="4" id="category-4" v-model="goodsTypeCheck">
          <label for="category-4">
            <span></span>
            相机
          </label>
        </div>
        <div class="input-checkbox">
          <input type="checkbox" :value="5" id="category-5" v-model="goodsTypeCheck">
          <label for="category-5">
            <span></span>
            家电
          </label>
        </div>
        <div class="input-checkbox">
          <input type="checkbox" :value="6" id="category-6" v-model="goodsTypeCheck">
          <label for="category-6">
            <span></span>
            AI智能
          </label>
        </div>
      </div>
    </div>
    <!-- price -->
    <div class="aside">
      <h3 class="aside-title">价格</h3>
      <div class="price-filter">
        <Slider v-model="sliderPrice" :tip-format="hideFormat" :max="sliderMax"></Slider>
        <div class="input-number price-min">
          <input
            id="price-min"
            type="number"
            @blur="minPriceChange"
            @change="minPriceChange"
            v-model="minPrice"
            value="1"
          >
          <span class="qty-up" @click="minInc">+</span>
          <span class="qty-down" @click="minDesc">-</span>
        </div>
        <span>-</span>
        <div class="input-number price-max">
          <input
            id="price-max"
            type="number"
            @blur="maxPriceChange"
            @change="maxPriceChange"
            v-model="maxPrice"
            value="1"
          >
          <span class="qty-up" @click="maxInc">+</span>
          <span class="qty-down" @click="maxDesc">-</span>
        </div>
      </div>
    </div>
    <!-- brand -->
    <div class="aside">
      <Button
        type="primary" size="large" shape="circle"
        @click="sureFilter">确 定</Button>
    </div>
    <!-- Top selling -->
    <div class="aside">
      <h3 class="aside-title">其它商品</h3>
      <div class="product-widget" v-for="(item, index) in otherData" :key="index">
        <div class="product-img">
          <img :src="item.mainPicPath" alt="">
        </div>
        <div class="product-body" @click="goDetailPage(item.goodsId)">
          <p class="product-category">{{item.goodsType | filterGoodsType}}</p>
          <h3 class="product-name">{{item.title}}</h3>
          <h4 class="product-price">￥{{item.originalPrice | formatPrice}} <del class="product-old-price">￥{{item.showPrice | formatPrice}}</del></h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      minPrice: 1,
      maxPrice: 1,
      sliderPrice: 1,
      sliderMax: 100,
      goodsTypeCheck: []
    }
  },
  props: {
    otherData: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'getStorePriceType'
    ])
  },
  methods: {
    hideFormat () {
      return null
    },
    sureFilter () {
      this.$emit('sureFilter', this.goodsTypeCheck, this.minPrice, this.sliderPrice)
    },
    goDetailPage (id) {
      this.$router.push({
        name: 'detail',
        query: { id: id }
      })
    },
    minInc () {
      this.minPrice += 1
      if (this.minPrice > this.sliderMax) this.minPrice = this.sliderMax
    },
    minDesc () {
      this.minPrice -= 1
      if (this.minPrice < 0) this.minPrice = 0
    },
    maxInc () {
      this.maxPrice += 1
      if (this.maxPrice > this.sliderMax) this.maxPrice = this.sliderMax
    },
    maxDesc () {
      this.maxPrice -= 1
      if (this.maxPrice < this.minPrice) this.maxPrice = this.minPrice
    },
    minPriceChange () {
      if (this.minPrice < 0) this.minPrice = 0
      if (this.minPrice > this.sliderMax) this.minPrice = this.sliderMax
    },
    maxPriceChange () {
      if (this.maxPrice > this.sliderMax) this.maxPrice = this.sliderMax
      if (this.maxPrice < this.minPrice) this.maxPrice = this.minPrice
    }
  },
  watch: {
    sliderPrice () {
      this.maxPrice = this.sliderPrice
    },
    maxPrice () {
      this.sliderPrice = Number(this.maxPrice)
    },
    getStorePriceType () {
      switch (this.getStorePriceType) {
        case 0:
          this.sliderMax = 999999
          break
        case 1:
          this.sliderMax = 100
          break
        case 2:
          this.sliderMax = 500
          break
        case 3:
          this.sliderMax = 1000
          break
        case 4:
          this.sliderMax = 5000
          break
        case 5:
          this.sliderMax = 999999
          break
        default:
          this.sliderMax = 999999
          break
      }
      if (this.maxPrice > this.sliderMax) this.maxPrice = this.sliderMax
    }
  }
}
</script>

<style scoped>
  .aside button{
    width: 100%;
  }
  .aside >>> .ivu-btn-primary{
    background-color: #D10024;
    border-color: #D10024;
  }
  .price-filter >>> .ivu-slider-button{
    border: 2px solid #D10024;
  }
  .price-filter >>> .ivu-slider-bar{
    background: #D10024;
  }
  .product-body{
    cursor: pointer;
  }
</style>
