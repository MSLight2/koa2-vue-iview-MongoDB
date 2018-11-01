<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-xs-6" v-for="(item, index) in dataList" :key="index">
          <div class="shop">
            <div class="shop-img">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="shop-body">
              <h3>{{item.titile}}<br>收藏</h3>
              <a
                href="javascript:;"
                class="cta-btn"
                @click="buyNow(item.type)"
                >立即购买 <i class="fa fa-arrow-circle-right"></i>
              </a>
            </div>
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
      dataList: [
        {
          titile: '笔记本',
          imgUrl: require('@/assets/img/shop01.png'),
          type: 1
        },
        {
          titile: '耳机',
          imgUrl: require('@/assets/img/shop03.png'),
          type: 3
        },
        {
          titile: '相机',
          imgUrl: require('@/assets/img/shop02.png'),
          type: 4
        }
      ]
    }
  },
  methods: {
    buyNow (type) {
      this.$emit('buyNow', type)
    }
  }
}
</script>
