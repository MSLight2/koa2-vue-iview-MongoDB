<template>
  <div class="col-md-5">
    <div class="product-details">
      <h2 class="product-name">product name goes here</h2>
      <div>
        <div class="product-rating">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-o"></i>
        </div>
        <a class="review-link" href="#">10 评价 | 我来评价</a>
      </div>
      <div>
        <h3 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h3>
        <span class="product-available">有现货</span>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <div class="product-options">
        <label>
          尺寸
          <select class="input-select">
            <option value="0">X</option>
          </select>
        </label>
        <label>
          颜色
          <select class="input-select">
            <option value="0">Red</option>
          </select>
        </label>
      </div>
      <div class="add-to-cart">
        <div class="qty-label">
          数量
          <div class="input-number">
            <input type="number">
            <span class="qty-up">+</span>
            <span class="qty-down">-</span>
          </div>
        </div>
        <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
      </div>
      <ul class="product-btns">
        <li><a href="#"><i class="fa fa-heart-o"></i> 收藏</a></li>
        <li><a href="#"><i class="fa fa-exchange"></i>&nbsp;&nbsp;找同款</a></li>
      </ul>
      <ul class="product-links">
        <li>类别:</li>
        <li><a href="#">笔记本</a></li>
        <li><a href="#">配件</a></li>
      </ul>
      <ul class="product-links">
        <li>分享:</li>
        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
        <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
        <li><a href="#"><i class="fa fa-envelope"></i></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
