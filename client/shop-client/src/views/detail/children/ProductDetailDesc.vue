<template>
  <div class="col-md-5">
    <div class="product-details">
      <h2 class="product-name">{{dataInfo.title | filterTitle}}</h2>
      <div class="g-desc">
        <div class="product-rating">
          <i class="fa fa-star" v-for="item in starRate" :key="item"></i>
          <i class="fa fa-star-o" v-for="i in (5 - starRate)" :key="i"></i>
        </div>
        <a
          class="review-link"
          href="JavaScript:;"
          @click="toEvaluatet">{{evaluateCount}} 评价 | 我来评价
        </a>
      </div>
      <div>
        <h3 class="product-price">￥{{dataInfo.originalPrice | formatPrice}} <del class="product-old-price">￥{{dataInfo.showPrice | formatPrice}}</del></h3>
        <span class="product-available">{{dataInfo.quantity > 0 ? '有现货' : '已卖完o(╥﹏╥)o'}}</span>
      </div>
      <p>{{dataInfo.title}}</p>
      <div class="product-options">
        <label>颜色
          <select class="input-select" v-model="colorSelect">
            <option :value="0">红色</option>
            <option :value="1">黑色</option>
            <option :value="2">粉色</option>
            <option :value="3">白色</option>
          </select>
        </label>
      </div>
      <div class="add-to-cart">
        <div class="qty-label">数量
          <div class="input-number">
            <input type="number" v-model="goodsCount" @change="incCount">
            <span class="qty-up" @click="incCount">+</span>
            <span class="qty-down" @click="decCount">-</span>
          </div>
        </div>
        <button class="add-to-cart-btn" @click="addToCart(dataInfo.goodsId)">
          <i class="fa fa-shopping-cart"></i>加入购物车
        </button>
      </div>
      <ul class="product-btns">
        <li @click="addToCollection(dataInfo.goodsId)">
          <a href="javascript:;"><i class="fa fa-heart-o"></i> 收藏</a>
        </li>
        <li>
          <a :href="dataInfo.auctionURL" target="_blank">
          <i class="fa fa-exchange"></i>&nbsp;&nbsp;找同款</a>
        </li>
      </ul>
      <ul class="product-links">
        <li>类别:</li>
        <li>{{dataInfo.goodsType | filterGoodsType}}</li>
      </ul>
      <ul class="product-links">
        <li>分享:</li>
        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
        <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
        <li><a href="#"><i class="fa fa-envelope"></i></a></li>
      </ul>
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
import LoginStorage from '@/utils/login'
import IviewModal from '@/components/puppetComponent/Modal/IviewModal'

export default {
  data () {
    return {
      modalShow: false,
      colorSelect: 0,
      goodsCount: 1
    }
  },
  components: {
    IviewModal
  },
  props: {
    dataInfo: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    },
    evaluateCount: {
      type: Number,
      require: true,
      default: 0
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
      if (!LoginStorage.getToken()) {
        this.$Message.error('请登录后在试！')
        return
      }
      CollectionApi.AddCollection({ goodsId: id }).then(res => {
        if (res.errMsg) this.$Message.warning(res.errMsg)
        if (res.isSuccess) this.$Message.success('已收藏！')
      }).catch((err) => {
        if (err.code >= 1000 & err.code <= 1002) {
          this.modalShow = true
        } else {
          this.$Message.error('服务器不想理你，请稍后重试')
        }
      })
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
        if (res.isSuccess) this.$Message.success('商品已在购物车，等你呦(*╹▽╹*)！')
      }).catch((err) => {
        if (err.code >= 1000 & err.code <= 1002) {
          this.modalShow = true
        } else {
          this.$Message.error('服务器不想理你，请稍后重试')
        }
      })
    },
    incCount () {
      this.goodsCount = Number(this.goodsCount) + 1
      if (this.goodsCount > this.dataInfo.quantity) {
        this.goodsCount = this.dataInfo.quantity
      }
    },
    decCount () {
      this.goodsCount = Number(this.goodsCount) - 1
      if (this.goodsCount <= 1) {
        this.goodsCount = 1
      }
    },
    // 去评价
    toEvaluatet () {
      this.$emit('addEvaluate')
    }
  },
  filters: {
    filterTitle (val) {
      if (val && val.length > 10) {
        return val.slice(0, 10) + '...'
      } else {
        return val
      }
    }
  }
}
</script>

<style scoped>
  .g-desc{
    margin-top: 10px;
  }
</style>
