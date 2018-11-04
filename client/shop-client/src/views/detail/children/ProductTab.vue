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
      <!-- product tab content -->
      <div class="tab-content">
        <slick
          ref="tabSlick"
          :options="tabSlickOption">
            <div class="tab-pane">
              <div class="row">
                <div class="col-md-12">
                  <p>{{dataInfo.title}}</p>
                </div>
              </div>
            </div>
            <div class="tab-pane">
              <div class="row">
                <div class="col-md-12">
                  <div class="pane-detail">
                    <p><span>商品：</span>{{dataInfo.title}}</p>
                    <p><span>原始价格：</span>￥{{dataInfo.originalPrice | formatPrice}}</p>
                    <p><span>折扣价：</span>￥{{dataInfo.showPrice | formatPrice}}</p>
                    <p><span>发货地：</span>{{dataInfo.location}}</p>
                    <p><span>剩余库存：</span>{{dataInfo.quantity}}</p>
                    <p><span>所属类别：</span>{{dataInfo.goodsType | filterGoodsType}}</p>
                  </div>
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
                    <div class="review-form">
                      <input class="input" type="text" placeholder="昵称" v-model="nickName">
                      <input class="input" type="email" placeholder="邮箱地址" v-model="userEmail">
                      <textarea class="input" placeholder="你的评价" v-model="feedBack"></textarea>
                      <div class="input-rating">
                        <span>你的评分: </span>
                        <div class="stars">
                          <input id="star5" name="rating" value="5" type="radio" v-model="startRate"><label for="star5"></label>
                          <input id="star4" name="rating" value="4" type="radio" v-model="startRate"><label for="star4"></label>
                          <input id="star3" name="rating" value="3" type="radio" v-model="startRate"><label for="star3"></label>
                          <input id="star2" name="rating" value="2" type="radio" v-model="startRate"><label for="star2"></label>
                          <input id="star1" name="rating" value="1" type="radio" v-model="startRate"><label for="star1"></label>
                        </div>
                      </div>
                      <button class="primary-btn" @click="evaluateSubmit">提交</button>
                    </div>
                  </div>
                </div>
                <!-- /Review Form -->
              </div>
            </div>
        </slick>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from 'vue-slick'
import Utils from '@/utils/utils'

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
      },
      nickName: '',
      userEmail: '',
      feedBack: '',
      startRate: 0
    }
  },
  components: {
    Slick
  },
  props: {
    tabIndex: {
      type: Number,
      require: true,
      default: 0
    },
    evaluateList: {
      type: Array,
      require: true,
      default: () => []
    },
    dataInfo: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
    this.slickInit()
  },
  methods: {
    slickInit () {
      this.$refs.tabSlick.reSlick()
    },
    tabClick (index) {
      // this.tabCurrentIndex = index
      // this.$refs.tabSlick.goTo(index, false)
      this.$emit('tabChange', index)
    },
    // 提交评价
    evaluateSubmit () {
      if (!this.nickName || !this.userEmail) {
        this.$Message.warning('请输入【昵称】或【邮箱】')
        return
      }
      if (!Utils.isEmail(this.userEmail)) {
        this.$Message.warning('输入的邮箱格式不正确！')
        return
      }
      if (!this.feedBack) {
        this.$Message.warning('你的评价不能为空(＾Ｕ＾)ノ~ＹＯ')
        return
      }
      if (!this.startRate) {
        this.$Message.warning('你还没评分呢- 。-！')
        return
      }
      this.$emit('evaluateSubmit', {
        nickName: this.nickName,
        userEmail: this.userEmail,
        feedBack: this.feedBack,
        startRate: this.startRate
      })
    }
  },
  watch: {
    tabIndex () {
      this.tabCurrentIndex = this.tabIndex
      this.$refs.tabSlick.goTo(this.tabIndex, true)
    }
  }
}
</script>

<style scoped>
  .tab-pane{
    font-weight: 600;
    font-size: 14px;
  }
  .pane-detail p{
    margin: 5px 0;
  }
  .pane-detail span{
    display: inline-block;
    width: 90px;
    text-align: right;
  }
</style>
