<template>
  <div class="product spa">
    <div class="product-img">
      <img :src="dataInfo.mainPicPath | filterImgUrl" alt="">
    </div>
    <div class="product-body">
      <p class="product-category">{{dataInfo.goodsType | filterGoodsType}}</p>
      <h3 class="product-name">{{dataInfo.title}}</h3>
      <h4 class="product-price">${{dataInfo.originalPrice | formatPrice}} 
        <del class="product-old-price">${{dataInfo.showPrice | formatPrice}}</del>
      </h4>
      <div class="product-rating">
        <i class="fa fa-star" v-for="item in starRate" :key="item"></i>
        <i class="fa fa-star no" v-for="i in (5 - starRate)"></i>
      </div>
      <div class="product-btns">
        <button class="add-to-wishlist" @click="addToCollection(dataInfo.goodsId)">
          <i class="fa fa-heart-o"></i><span class="tooltipp">收藏</span>
        </button>
        <button class="add-to-compare" @click="findSimilar(dataInfo.auctionURL)">
          <i class="fa fa-exchange"></i><span class="tooltipp">找同款</span>
        </button>
        <button class="quick-view" @click="checkDetail(dataInfo.goodsId)">
          <i class="fa fa-eye"></i><span class="tooltipp">查看详情</span>
        </button>
      </div>
    </div>
    <div class="add-to-cart">
      <button class="add-to-cart-btn" @click="addToCart(dataInfo.goodsId)">
        <i class="fa fa-shopping-cart"></i>加入购物车
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    dataInfo: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    starRate () {
      if (this.dataInfo.goodRate) {
        return Math.round(Number(this.dataInfo.goodRate) / 100 * 5)
      }
      return 0
    }
  },
  methods: {
    // 添加收藏
    addToCollection (id) {
    },
    // 相似
    findSimilar (url) {
      window.open(url)
    },
    // 查看详情
    checkDetail (id) {
      this.$router.push({
        name: 'detail',
        query: { id: id }
      })
    },
    // 加入购物车
    addToCart () {
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
    },
    filterImgUrl (val) {
      if (val) {
        return val.replace(/_60x60.jpg/g, '_240x240.jpg')
      } else {
        return '--'
      }
    }
  }
}
</script>

<style scoped>
  .product-img{
    cursor: pointer;
  }
  .spa .product-name{
    height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .product .product-body .product-rating>i.no{
    color: #eee;
  }
</style>
