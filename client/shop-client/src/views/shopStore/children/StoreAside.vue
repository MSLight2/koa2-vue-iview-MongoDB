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
          <input id="price-min" type="number" v-model="minPrice" value="1">
          <span class="qty-up">+</span>
          <span class="qty-down">-</span>
        </div>
        <span>-</span>
        <div class="input-number price-max">
          <input id="price-max" type="number" v-model="sliderPrice" value="1">
          <span class="qty-up">+</span>
          <span class="qty-down">-</span>
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
export default {
  data () {
    return {
      minPrice: 1,
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
