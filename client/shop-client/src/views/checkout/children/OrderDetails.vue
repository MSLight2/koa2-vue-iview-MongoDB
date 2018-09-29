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
      <div class="order-products">
        <div class="order-col">
          <div>1x Product Name Goes Here</div>
          <div>$980.00</div>
        </div>
        <div class="order-col">
          <div>2x Product Name Goes Here</div>
          <div>$980.00</div>
        </div>
      </div>
      <div class="order-col">
        <div>运费</div>
        <div><strong>免费</strong></div>
      </div>
      <div class="order-col">
        <div><strong>总金额</strong></div>
        <div><strong class="order-total">$2940.00</strong></div>
      </div>
    </div>
    <div class="payment-method">
      <div class="input-radio">
        <input type="radio" name="payment" id="payment-1" value="1" v-model="typePick">
        <label for="payment-1">
          <span></span>
          网银
        </label>
        <div class="caption">
          <p>支持各大银行网银支付</p>
        </div>
      </div>
      <div class="input-radio">
        <input type="radio" name="payment" id="payment-2" value="2" v-model="typePick">
        <label for="payment-2">
          <span></span>
          信用卡
        </label>
        <div class="caption">
          <p>支持中国银行、工商银行、农商银行、建设银行、广发银行</p>
        </div>
      </div>
      <div class="input-radio">
        <input type="radio" name="payment" id="payment-3" value="3" v-model="typePick">
        <label for="payment-3">
          <span></span>
          快捷支付
        </label>
        <div class="caption">
          <p>支付宝、微信、QQ钱包</p>
        </div>
      </div>
    </div>
    <div class="input-checkbox">
      <input type="checkbox" id="terms" value="agree" v-model="userIsAgren">
      <label for="terms">
        <span></span>
        我已经阅读并接受<a href="#">条款</a>
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
    dataInfo: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  methods: {
    payNow () {
      this.$emit('payNow', this.typePick, this.userIsAgren)
    }
  }
}
</script>
