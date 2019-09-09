<template>
  <div id="store" class="col-md-9">
    <!-- store top filter -->
    <div class="store-filter clearfix">
      <div class="store-sort">
        <label>
          排序:
          <select class="input-select" v-model="filterSelect" @change="filterChange">
            <option :value="0">无</option>
            <option :value="1">销量</option>
            <option :value="2">价格</option>
          </select>
        </label>
        <label v-if="filterSelect">
          价格筛选:
          <select class="input-select" v-model="priceRangeSelect" @change="priceChange">
            <option :value="0">不限</option>
            <option :value="1">100以下</option>
            <option :value="2">100~500</option>
            <option :value="3">500~1000</option>
            <option :value="4">1000~5000</option>
            <option :value="5">5000以上</option>
          </select>
        </label>
      </div>
    </div>
    <!-- store products -->
    <div class="row">
      <!-- product -->
      <div class="col-md-4 col-xs-6" v-for="(item, index) in dataList" :key="index">
        <product-item :data-info="item"></product-item>
      </div>
    </div>
    <!-- pagination -->
    <div class="store-filter clearfix" v-if="dataList.length > 0">
      <ul class="store-pagination">
        <slot name="pagination"></slot>
      </ul>
    </div>
    <div class="row store-nodata" v-else>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wushuju"></use>
      </svg>
      <div>查询不到该商品</div>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/puppetComponent/ProductItem'

export default {
  data () {
    return {
      filterSelect: 0,
      priceRangeSelect: 0
    }
  },
  components: {
    ProductItem
  },
  props: {
    dataList: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  methods: {
    filterChange () {
      this.$emit('filterChange', this.filterSelect)
    },
    priceChange () {
      this.$emit('priceChange', this.priceRangeSelect)
    }
  }
}
</script>

<style scoped>
  .store-nodata{
    margin-top: 100px;
    text-align: center;
    font-size: 16px;
  }
</style>
