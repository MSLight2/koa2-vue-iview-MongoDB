<template>
  <div class="product spa">
    <div class="product-img"
      @click="checkDetail(dataInfo.goodsId)"
      v-lazy-container="{ selector: 'img' }"
      :key="dataInfo.goodsId">
        <img :data-src="dataInfo.mainPicPath | filterImgUrl" alt="">
    </div>
    <div class="product-body">
      <p class="product-category">{{dataInfo.goodsType | filterGoodsType}}</p>
      <h3 class="product-name">{{dataInfo.title}}</h3>
      <h4 class="product-price">￥{{dataInfo.originalPrice | formatPrice}}
        <del class="product-old-price">￥{{dataInfo.showPrice | formatPrice}}</del>
      </h4>
      <div class="product-rating">
        <i class="fa fa-star" v-for="item in starRate" :key="item"></i>
        <i class="fa fa-star no" v-for="i in (5 - starRate)" :key="i"></i>
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
    <iview-modal
      :is-show="modalShow"
      type="warning"
      content="您还未登录，请登录后再操作"
      sureText="知道了"
      @close="modalShow = false">
    </iview-modal>
  </div>
</template>

<script>
import * as CollectionApi from '@/api/collection'
import * as AddCartApi from '@/api/cart'
import IviewModal from '@/components/puppetComponent/Modal/IviewModal'
import LoginStorage from '@/utils/login'

export default {
  data () {
    return {
      modalShow: false
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
  components: {
    IviewModal
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
      if (!LoginStorage.getToken()) {
        this.$Message.error('请登录后在试！')
        return
      }
      CollectionApi.AddCollection({ goodsId: id }).then(res => {
        if (res.errMsg) this.$Message.warning(res.errMsg)
        if (res.isSuccess) {
          this.$store.dispatch('getCountAction')
          this.$Message.success('已收藏！')
        }
      }).catch((err) => {
        if (err.code >= 1000 & err.code <= 1002) {
          this.modalShow = true
        } else {
          this.$Message.error('服务器不想理你，请稍后重试')
        }
      })
    },
    // 相似
    findSimilar (url) {
      window.open(url)
    },
    // 查看详情
    checkDetail (id) {
      // this.$router.push({
      //   name: 'detail',
      //   query: { id: id }
      // })
      window.open(`/detail?id=${id}`)
    },
    // 加入购物车
    addToCart (id) {
      if (!LoginStorage.getToken()) {
        this.$Message.error('请登录后在试！')
        return
      }
      let params = {
        goodsId: id,
        goodsNum: 1
      }
      AddCartApi.AddOrEditCart(params).then(res => {
        if (res.errMsg) this.$Message.warning(res.errMsg)
        if (res.isSuccess) {
          this.$store.dispatch('getCountAction')
          this.$Message.success('商品已在购物车，等你呦(*╹▽╹*)！')
        }
      }).catch((err) => {
        if (err.code >= 1000 & err.code <= 1002) {
          this.modalShow = true
        } else {
          this.$Message.error('服务器休息中，请稍后重试')
        }
      })
    }
  },
  filters: {
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
  .product-img{
    max-height: 260px;
  }
</style>
