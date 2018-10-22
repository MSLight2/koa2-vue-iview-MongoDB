<template>
  <div class="col-md-12">
    <div id="product-tab">
      <!-- product tab nav -->
      <ul class="tab-nav">
        <li :class="{'active': tabCurrentIndex === 0}" @click="tabClick(0)">
          <a href="javascript:;">描述</a>
        </li>
        <li :class="{'active': tabCurrentIndex === 1}" @click="tabClick(1)">
          <a href="javascript:;">详情</a>
        </li>
        <li :class="{'active': tabCurrentIndex === 2}" @click="tabClick(2)">
          <a href="javascript:;">评价 (10)</a>
        </li>
      </ul>
      <!-- /product tab nav -->
      <!-- product tab content -->
      <div class="tab-content">
        <slick
          ref="tabSlick"
          :options="tabSlickOption">
            <div class="tab-pane">
              <div class="row">
                <div class="col-md-12">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              </div>
            </div>
            <div class="tab-pane">
              <div class="row">
                <div class="col-md-12">
                  <p>暂无详情</p>
                </div>
              </div>
            </div>
            <div class="tab-pane">
              <div class="row">
                <!-- Rating -->
                <div class="col-md-3">
                  <div id="rating">
                    <div class="rating-avg">
                      <span>4.5</span>
                      <div class="rating-stars">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                      </div>
                    </div>
                    <ul class="rating">
                      <li>
                        <div class="rating-stars">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                        </div>
                        <div class="rating-progress">
                          <div style="width: 80%;"></div>
                        </div>
                        <span class="sum">3</span>
                      </li>
                      <li>
                        <div class="rating-stars">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star-o"></i>
                        </div>
                        <div class="rating-progress">
                          <div style="width: 60%;"></div>
                        </div>
                        <span class="sum">2</span>
                      </li>
                      <li>
                        <div class="rating-stars">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star-o"></i>
                          <i class="fa fa-star-o"></i>
                        </div>
                        <div class="rating-progress">
                          <div></div>
                        </div>
                        <span class="sum">0</span>
                      </li>
                      <li>
                        <div class="rating-stars">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star-o"></i>
                          <i class="fa fa-star-o"></i>
                          <i class="fa fa-star-o"></i>
                        </div>
                        <div class="rating-progress">
                          <div></div>
                        </div>
                        <span class="sum">0</span>
                      </li>
                      <li>
                        <div class="rating-stars">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star-o"></i>
                          <i class="fa fa-star-o"></i>
                          <i class="fa fa-star-o"></i>
                          <i class="fa fa-star-o"></i>
                        </div>
                        <div class="rating-progress">
                          <div></div>
                        </div>
                        <span class="sum">0</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- /Rating -->

                <!-- Reviews -->
                <div class="col-md-6">
                  <div id="reviews">
                    <ul class="reviews">
                      <li>
                        <div class="review-heading">
                          <h5 class="name">John</h5>
                          <p class="date">27 DEC 2018, 8:0 PM</p>
                          <div class="review-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o empty"></i>
                          </div>
                        </div>
                        <div class="review-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                      </li>
                      <li>
                        <div class="review-heading">
                          <h5 class="name">John</h5>
                          <p class="date">27 DEC 2018, 8:0 PM</p>
                          <div class="review-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o empty"></i>
                          </div>
                        </div>
                        <div class="review-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                      </li>
                      <li>
                        <div class="review-heading">
                          <h5 class="name">John</h5>
                          <p class="date">27 DEC 2018, 8:0 PM</p>
                          <div class="review-rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-o empty"></i>
                          </div>
                        </div>
                        <div class="review-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                      </li>
                    </ul>
                    <ul class="reviews-pagination">
                      <li class="active">1</li>
                      <li><a href="#">2</a></li>
                      <li><a href="#">3</a></li>
                      <li><a href="#">4</a></li>
                      <li><a href="#"><i class="fa fa-angle-right"></i></a></li>
                    </ul>
                  </div>
                </div>
                <!-- /Reviews -->

                <!-- Review Form -->
                <div class="col-md-3">
                  <div id="review-form">
                    <form class="review-form">
                      <input class="input" type="text" placeholder="昵称">
                      <input class="input" type="email" placeholder="邮箱地址">
                      <textarea class="input" placeholder="你的评价"></textarea>
                      <div class="input-rating">
                        <span>你的评分: </span>
                        <div class="stars">
                          <input id="star5" name="rating" value="5" type="radio"><label for="star5"></label>
                          <input id="star4" name="rating" value="4" type="radio"><label for="star4"></label>
                          <input id="star3" name="rating" value="3" type="radio"><label for="star3"></label>
                          <input id="star2" name="rating" value="2" type="radio"><label for="star2"></label>
                          <input id="star1" name="rating" value="1" type="radio"><label for="star1"></label>
                        </div>
                      </div>
                      <button class="primary-btn">提交</button>
                    </form>
                  </div>
                </div>
                <!-- /Review Form -->
              </div>
            </div>
        </slick>
      </div>
      <!-- /product tab content  -->
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick'

export default {
  data () {
    return {
      tabCurrentIndex: 0,
      tabSlickOption: {
        touchMove: false,
        draggable: false,
        arrows: false,
        adaptiveHeight: true,
        speed: 300,
        fade: true,
        cssEase: 'linear'
      }
    }
  },
  components: {
    Slick
  },
  mounted () {
    this.slickInit()
  },
  methods: {
    slickInit () {
      this.$refs.tabSlick.reSlick()
    },
    tabClick (index) {
      this.tabCurrentIndex = index
      this.$refs.tabSlick.goTo(index, false)
    }
  }
}
</script>
