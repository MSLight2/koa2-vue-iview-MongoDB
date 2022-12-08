<template>
  <div class="section">
    <div class="container hot-cnt">
      <div class="row">
        <div class="col-md-4 col-xs-6" v-for="(item, index) in dataList" :key="index">
          <div class="shop">
            <div class="shop-img">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="shop-body">
              <h3>{{item.titile}}<br>收藏</h3>
              <a
                href="javascript:;"
                class="cta-btn"
                @click="buyNow(item.type)"
                >立即购买 <i class="fa fa-arrow-circle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import shop1 from '@/assets/img/shop01.png';
  import shop2 from '@/assets/img/shop02.png';
  import shop3 from '@/assets/img/shop03.png';

  const emit = defineEmits(['buyNow']);
  const dataList = [
    {
      titile: '笔记本',
      imgUrl: shop1,
      type: 1
    },
    {
      titile: '耳机',
      imgUrl: shop3,
      type: 3
    },
    {
      titile: '相机',
      imgUrl: shop2,
      type: 4
    }
  ]
  const buyNow = (type: number) => {
    emit('buyNow', type)
  }
</script>

<style scoped>
  .hot-cnt{
    min-height: 270px;
  }
</style>