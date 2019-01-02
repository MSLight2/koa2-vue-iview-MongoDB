<template>
  <div>
    <h3 class="user-h3">个人收藏</h3>
    <div class="collection-box">
      <div class="collection-user-item" v-for="(item, index) in 6" :key="index">
        <div class="collection-item-detail">
          <div class="collection-item-desc">
            <div class="img"><img src="http://img.alicdn.com/bao/uploaded/i2/2382617777/TB1hUqUXZUrBKNjSZPxXXX00pXa_!!0-item_pic.jpg" alt=""></div>
            <div class="detail">
              <p class="title">华为荣耀8X手机壳荣耀畅玩8C手机壳8XMAX保护套畅享MAX硅胶荣耀8软壳青春版磨砂防摔全包纤薄男女款</p>
              <div class="price"><strong>￥45.21</strong><del>￥45.00</del></div>
            </div>
          </div>
          <div class="collection-item-time">收藏时间：2018-12-08 17:45</div>
          <div class="collection-item-icon" @click="deleteCollection()">
            <i class="iconfont icon-shanchu" title="删除"></i>
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
    }
  },
  methods: {
    // 删除
    deleteCollection () {
    }
  }
}
</script>
