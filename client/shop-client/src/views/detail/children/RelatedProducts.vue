<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title text-center">
            <h3 class="title">相关商品</h3>
          </div>
        </div>
        <!-- product -->
        <div class="col-md-3 col-xs-6" v-for="index in 4" :key="index">
          <product-item :data-info="dataInfo"></product-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/puppetComponent/ProductItem'

export default {
  data () {
    return {
      dataInfo: {}
    }
  },
  components: {
    ProductItem
  }
}
</script>
