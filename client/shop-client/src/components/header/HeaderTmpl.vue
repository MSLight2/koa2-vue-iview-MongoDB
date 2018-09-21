<template>
  <header>
    <!-- TOP HEADER -->
    <top-header></top-header>
    <!-- MAIN HEADER -->
    <div id="header">
      <!-- container -->
      <div class="container">
        <!-- row -->
        <div class="row">
          <!-- LOGO -->
          <div class="col-md-3">
            <div class="header-logo">
              <a href="#" class="logo">
                <img src="@/assets/img/logo.png" alt="">
              </a>
            </div>
          </div>
          <!-- SEARCH BAR -->
          <div class="col-md-6">
            <div class="header-search">
              <form>
                <select class="input-select">
                  <option value="0">所有类目</option>
                  <option value="1">衣服</option>
                  <option value="1">鞋子</option>
                </select>
                <input class="input" placeholder="请输入要搜索的商品">
                <button class="search-btn">搜索</button>
              </form>
            </div>
          </div>
          <!-- ACCOUNT -->
          <div class="col-md-3 clearfix">
            <div class="header-ctn">
              <!-- Wishlist -->
              <div>
                <a href="#">
                  <i class="fa fa-heart-o"></i>
                  <span>收藏</span>
                  <div class="qty">2</div>
                </a>
              </div>
              <!-- /Wishlist -->
              <!-- Cart -->
              <div class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                  <i class="fa fa-shopping-cart"></i>
                  <span>购物车</span>
                  <div class="qty">3</div>
                </a>
                <div class="cart-dropdown">
                  <div class="cart-list">
                    <div class="product-widget">
                      <div class="product-img">
                        <img src="" alt="">
                      </div>
                      <div class="product-body">
                        <h3 class="product-name"><a href="#">product name goes here</a></h3>
                        <h4 class="product-price"><span class="qty">1x</span>$980.00</h4>
                      </div>
                      <button class="delete"><i class="fa fa-close"></i></button>
                    </div>
                    <div class="product-widget">
                      <div class="product-img">
                        <img src="" alt="">
                      </div>
                      <div class="product-body">
                        <h3 class="product-name"><a href="#">product name goes here</a></h3>
                        <h4 class="product-price"><span class="qty">3x</span>$980.00</h4>
                      </div>
                      <button class="delete"><i class="fa fa-close"></i></button>
                    </div>
                  </div>
                  <div class="cart-summary">
                    <small>选择商品个数（3）</small>
                    <h5>SUBTOTAL: $2940.00</h5>
                  </div>
                  <div class="cart-btns">
                    <a href="#">查看购物车</a>
                    <a href="#">立即购买  <i class="fa fa-arrow-circle-right"></i></a>
                  </div>
                </div>
              </div>
              <!-- /Cart -->
              <!-- Menu Toogle -->
              <div class="menu-toggle">
                <a href="#">
                  <i class="fa fa-bars"></i>
                  <span>菜单</span>
                </a>
              </div>
              <!-- /Menu Toogle -->
            </div>
          </div>
        </div>
        <!-- row -->
      </div>
    </div>
  </header>
</template>

<script>
import TopHeader from './TopHeader'
export default {
  data () {
    return {
    }
  },
  components: {
    TopHeader
  }
}
</script>
