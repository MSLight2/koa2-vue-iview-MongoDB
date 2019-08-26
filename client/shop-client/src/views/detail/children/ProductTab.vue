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
          <a href="javascript:;">评价 ({{starLength || 0}})</a>
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
                <template v-if="starLength > 0">
                  <!-- Rating -->
                  <div class="col-md-3">
                    <div id="rating">
                      <div class="rating-avg">
                        <span>{{averageStar}}</span>
                        <div class="rating-stars">
                          <!-- eslint-disable-next-line -->
                          <i class="fa fa-star" v-for="item in averageStar"></i>
                          <!-- eslint-disable-next-line -->
                          <i class="fa fa-star-o" v-for="i in (5 - averageStar)"></i>
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
                            <div :style="`width: ${starWidth[0]}%;`"></div>
                          </div>
                          <span class="sum">{{starCount[0]}}</span>
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
                            <div :style="`width: ${starWidth[1]}%;`"></div>
                          </div>
                          <span class="sum">{{starCount[1]}}</span>
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
                            <div :style="`width: ${starWidth[2]}%;`"></div>
                          </div>
                          <span class="sum">{{starCount[2]}}</span>
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
                            <div :style="`width: ${starWidth[3]}%;`"></div>
                          </div>
                          <span class="sum">{{starCount[3]}}</span>
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
                            <div :style="`width: ${starWidth[4]}%;`"></div>
                          </div>
                          <span class="sum">{{starCount[4]}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- Reviews -->
                  <div class="col-md-6">
                    <div id="reviews">
                      <ul class="reviews" v-if="evaluateData.result !== undefined">
                        <li v-for="(item, index) in evaluateData.result" :key="index">
                          <div class="review-heading">
                            <h5 class="name">{{item.nickName}}</h5>
                            <p class="date">{{item.createTime | formatDate}}</p>
                            <div class="review-rating">
                              <!-- eslint-disable-next-line -->
                              <i class="fa fa-star" v-for="item in item.rate"></i>
                              <!-- eslint-disable-next-line -->
                              <i class="fa fa-star-o empty" v-for="i in (5 - item.rate)"></i>
                            </div>
                          </div>
                          <div class="review-body">
                            <p>{{item.review}}</p>
                          </div>
                        </li>
                      </ul>
                      <ul class="reviews-pagination" v-if="evaluateData.paginationModule.pageCount > 1">
                        <Page
                          :current="currentPage"
                          :page-size="pageSize"
                          :total="pageTotal"
                          @on-change="pageChange"
                        />
                      </ul>
                    </div>
                  </div>
                </template>
                <div class="col-md-9 no-evaluate" v-else>暂无评价</div>
                <!-- Review Form -->
                <div class="col-md-3">
                  <div id="review-form">
                    <div class="review-form">
                      <input class="input" type="text" placeholder="昵称" v-model="nickName">
                      <input class="input" type="email" placeholder="邮箱地址" v-model="userEmail">
                      <textarea class="input" style="resize:none" placeholder="你的评价" v-model="feedBack"></textarea>
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
              </div>
            </div>
        </slick>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
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
      startRate: 0,
      // 分页
      currentPage: 1,
      pageSize: 3,
      pageTotal: 0
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
    evaluateData: {
      type: Object,
      require: true,
      default: () => {
        return {}
      }
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
  computed: {
    starLength () {
      if (this.evaluateData.starList !== undefined) {
        return this.evaluateData.starList.length
      } else {
        return 0
      }
    },
    // 不同星级显示条的宽度
    starWidth () {
      let widthArr = []
      let starLength = this.starLength || 1
      this.starCount.forEach((item, index) => {
        widthArr[index] = item / starLength * 100
      })
      return widthArr
    },
    // 星级个数
    starCount () {
      let startCountArr = []
      startCountArr[0] = this.evaluateData.starList.filter(item => item.rate === 5).length
      startCountArr[1] = this.evaluateData.starList.filter(item => item.rate === 4).length
      startCountArr[2] = this.evaluateData.starList.filter(item => item.rate === 3).length
      startCountArr[3] = this.evaluateData.starList.filter(item => item.rate === 2).length
      startCountArr[4] = this.evaluateData.starList.filter(item => item.rate === 1).length
      return startCountArr
    },
    // 平均的星级
    averageStar () {
      let sum = 0
      this.starCount.forEach((item, index) => {
        if (index === 0) sum = sum + (item * 5)
        if (index === 1) sum = sum + (item * 4)
        if (index === 2) sum = sum + (item * 3)
        if (index === 3) sum = sum + (item * 2)
        if (index === 4) sum = sum + (item * 1)
      })
      return Math.round(sum / (this.starLength || 1))
    }
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
        this.$Message.warning('请输入【昵称】和【邮箱地址】')
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
    },
    pageChange (page) {
      this.$emit('pageChange', page)
    }
  },
  watch: {
    tabIndex () {
      this.tabCurrentIndex = this.tabIndex
      this.$refs.tabSlick.goTo(this.tabIndex, true)
    }
  },
  filters: {
    formatDate (val) {
      if (val) {
        return moment(parseInt(val)).format('YYYY-MM-DD HH:mm')
      } else {
        return '无'
      }
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
  .no-evaluate{
    text-align: center;
    height: 200px;
    line-height: 200px;
    padding-left: 300px;
  }
</style>
