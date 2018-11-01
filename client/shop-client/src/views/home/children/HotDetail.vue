<template>
  <div id="hot-deal" class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hot-deal">
            <ul class="hot-deal-countdown">
              <li>
                <div>
                  <h3>{{day | formatDate}}</h3>
                  <span>日</span>
                </div>
              </li>
              <li>
                <div>
                  <h3>{{hours | formatDate}}</h3>
                  <span>时</span>
                </div>
              </li>
              <li>
                <div>
                  <h3>{{minute | formatDate}}</h3>
                  <span>分</span>
                </div>
              </li>
              <li>
                <div>
                  <h3>{{second | formatDate}}</h3>
                  <span>秒</span>
                </div>
              </li>
            </ul>
            <h2 class="text-uppercase">本周畅销</h2>
            <p>新商品最多优惠50%</p>
            <a class="primary-btn cta-btn" href="javascript:;" @click="buyNow">立即购买</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      day: 0,
      hours: 0,
      minute: 0,
      second: 0,
      timeOut: null
    }
  },
  mounted () {
    this.getDateForTimeOut()
  },
  beforeDestroy () {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
      this.timeOut = null
    }
  },
  methods: {
    initDate () {
      let date = new Date()
      this.day = date.getDate()
      this.hours = date.getHours()
      this.minute = date.getMinutes()
      this.second = date.getSeconds()
    },
    getDateForTimeOut () {
      this.initDate()
      this.timeOut = setTimeout(this.getDateForTimeOut, 1000)
    },
    buyNow () {
      this.$emit('buyNow')
    }
  },
  filters: {
    formatDate (val) {
      return val < 10 ? '0' + val : val
    }
  }
}
</script>
