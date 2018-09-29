<template>
  <div id="store" class="col-md-9">
    <!-- store top filter -->
    <div class="store-filter clearfix">
      <div class="store-sort">
        <label>
          Sort By:
          <select class="input-select">
            <option value="0">Popular</option>
            <option value="1">Position</option>
          </select>
        </label>
        <label>
          Show:
          <select class="input-select">
            <option value="0">20</option>
            <option value="1">50</option>
          </select>
        </label>
      </div>
      <ul class="store-grid">
        <li class="active"><i class="fa fa-th"></i></li>
        <li><a href="#"><i class="fa fa-th-list"></i></a></li>
      </ul>
    </div>
    <!-- store products -->
    <div class="row">
      <!-- product -->
      <div class="col-md-4 col-xs-6" v-for="index in 9" :key="index">
        <product-item :data-info="dataInfo"></product-item>
      </div>
    </div>
    <!-- pagination -->
    <div class="store-filter clearfix">
      <span class="store-qty">Showing 20-100 products</span>
      <ul class="store-pagination">
        <li class="active">1</li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#"><i class="fa fa-angle-right"></i></a></li>
      </ul>
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
