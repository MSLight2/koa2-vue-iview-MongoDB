<template>
  <div class="product">
    <div class="product-img">
      <img src="@/assets/img/product01.png" alt="">
    </div>
    <div class="product-body">
      <p class="product-category">配件</p>
      <h3 class="product-name"><a href="#">高清耳机</a></h3>
      <h4 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h4>
      <div class="product-rating">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
      </div>
      <div class="product-btns">
        <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">收藏</span></button>
        <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">找同款</span></button>
        <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">查看详情</span></button>
      </div>
    </div>
    <div class="add-to-cart">
      <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i>加入购物车</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    dataInfo: {
      type: Object,
      require: true,
      default: () => {}
    }
  }
}
</script>
