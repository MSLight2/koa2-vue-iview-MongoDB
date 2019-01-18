<template>
  <div class="col-md-5 order-details">
    <div class="section-title text-center">
      <h3 class="title">订单详情</h3>
    </div>
    <div class="order-summary">
      <div class="order-col">
        <div><strong>商品列表</strong></div>
        <div><strong>金额</strong></div>
      </div>
      <div class="order-products" v-if="dataList.length > 0">
        <div class="order-col" v-for="(item, index) in dataList" :key="index">
          <div class="order-title"><strong>{{item.goodsNum}}</strong>x {{item.goodsId_docs[0].title}}</div>
          <div>￥{{item.goodsId_docs[0].showPrice}}</div>
        </div>
      </div>
      <div class="order-col no-order-list" v-else>没有订单o(╥﹏╥)o</div>
      <div class="order-col">
        <div>运费</div>
        <div><strong>免费</strong></div>
      </div>
      <div class="order-col">
        <div><strong>总金额</strong></div>
        <div><strong class="order-total">￥{{totalPayPrice | formatPrice}}</strong></div>
      </div>
    </div>
    <div class="payment-method">
      <div class="input-radio">
        <input type="radio" name="payment" id="payment-2" value="1" v-model="typePick">
        <label for="payment-2"><span></span>微信</label>
      </div>
      <div class="input-radio">
        <input type="radio" name="payment" id="payment-3" value="2" v-model="typePick">
        <label for="payment-3"><span></span>支付宝</label>
      </div>
      <div class="input-radio">
        <input type="radio" name="payment" id="payment-1" value="3" v-model="typePick">
        <label for="payment-1"><span></span>网银</label>
        <div class="caption"><p>支持各大银行网银支付</p></div>
      </div>
    </div>
    <div class="input-checkbox">
      <input type="checkbox" id="terms" value="agree" v-model="userIsAgren">
      <label for="terms">
        <span class="ck-checkbox"></span>我已经阅读并接受<a href="javascript:;" @click="showRule">条款</a>
      </label>
    </div>
    <a href="javascript:;" class="primary-btn order-submit" @click="payNow">立即支付</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      typePick: '',
      userIsAgren: []
    }
  },
  props: {
    dataList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  computed: {
    totalPayPrice () {
      let total = 0
      this.dataList.forEach(item => {
        total = total + (Number(item.goodsId_docs[0].showPrice) * item.goodsNum)
      })
      return total
    }
  },
  methods: {
    payNow () {
      if (this.dataList.length <= 0) return
      if (this.typePick === '') {
        this.$Message.warning('请选择支付方式')
        return
      }
      if (this.userIsAgren.length <= 0) {
        this.$Message.warning('你是否阅读并接受【条款】？')
        return
      }
      this.$emit('payNow', this.typePick, this.totalPayPrice)
    },
    // 条款
    showRule () {
      this.$Modal.confirm({
        title: '条款说明',
        okText: '知道啦',
        content: '<p>1、不能违法，自己自觉点！</p><p>2、搞事情我一概不负责。</p><p>3、我啥也没干，有事情一定是你瞎搞。</p><p>4、最后：少年！我劝你善良╭(╯^╰)╮</p><p>4、最最后：以上都是开玩笑，支付功能没做，付不了钱。O(∩_∩)O</p>'
      })
    }
  }
}
</script>

<style scoped>
  .order-title{
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .no-order-list{
    text-align: center;
    color: #D10024;
    margin: 10px 0;
    font-size: 14px;
  }
</style>
