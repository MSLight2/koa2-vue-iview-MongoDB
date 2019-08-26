<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="success-header">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiaoyichenggong"></use>
            </svg>
          </div>
          <div class="success-txt">订单已支付成功！</div>
        </div>
        <div class="success-btn">
          <button class="btn btn-sure" @click="goHome">返回首页</button>
          <button class="btn btn-order" @click="checkOrder">查看订单</button>
        </div>
        <div class="success-detail">
          <h4>订单详情：</h4>
          <div>
            <span class="left-sp">支付方式：</span>
            <span class="right-detail">{{$route.query.type | filterPayType}}</span>
          </div>
          <div>
            <span class="left-sp">支付金额：</span>
            <span class="right-detail">￥{{$route.query.price | formatPrice}}</span>
          </div>
          <div>
            <span class="left-sp">支付时间：</span>
            <span class="right-detail">{{$route.query.time | formatDateTime}}</span>
          </div>
          <div>
            <span class="left-sp">交易编号：</span>
            <span class="right-detail">{{$route.query.payNumber || '----'}}</span>
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
    }
  },
  methods: {
    goHome () {
      this.$router.replace({ name: 'home' })
    },
    checkOrder () {
      this.$router.replace({ name: 'order' })
    }
  },
  filters: {
    filterPayType (val) {
      switch (val) {
        case '1':
          return '微信'
        case '2':
          return '支付宝'
        case '3':
          return '网银'
        default:
          return '无'
      }
    }
  }
}
</script>

<style scoped>
  .success-header{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .success-txt{
    font-size: 40px;
    color: #f9cb57;
    font-weight: 600;
  }
  .success-detail{
    margin-top: 30px;
    border: 1px dotted #f9cb57;
    padding: 20px 20px;
  }
  .success-detail h4{
    color: #D10024;
    line-height: 40px;
  }
  .success-detail div{
    line-height: 25px;
    font-size: 14px;
  }
  .success-detail .left-sp{
    display: inline-block;
    text-align: left;
  }
  .success-detail .right-detail{
    color: #D10024;
  }
  .success-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  .success-btn .btn{
    height: 40px;
    text-align: center;
    border-radius: 20px;
    width: 140px;
    font-size: 14px;
    color: #fff;
    outline: none;
    transition: all 0.2s ease-in-out;
  }
  .success-btn .btn:hover{
    box-shadow: 0px 0px 5px 2px #DDD;
  }
  .success-btn .btn-sure{
    background: #D10024;
  }
  .success-btn .btn-order{
    background: #f5b613;
    margin-left: 50px;
  }
</style>
