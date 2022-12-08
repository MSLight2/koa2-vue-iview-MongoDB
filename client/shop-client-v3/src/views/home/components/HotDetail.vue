<template>
  <div id="hot-deal" class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hot-deal">
            <ul class="hot-deal-countdown">
              <li>
                <div>
                  <h3>{{formatDate(Number(day))}}</h3>
                  <span>日</span>
                </div>
              </li>
              <li>
                <div>
                  <h3>{{hours}}</h3>
                  <span>时</span>
                </div>
              </li>
              <li>
                <div>
                  <h3>{{minute}}</h3>
                  <span>分</span>
                </div>
              </li>
              <li>
                <div>
                  <h3>{{second}}</h3>
                  <span>秒</span>
                </div>
              </li>
            </ul>
            <h2 class="text-uppercase">本周畅销</h2>
            <p>新商品最多优惠50%</p>
            <a class="primary-btn cta-btn" href="javascript:;" @click="buyNow">立即购买</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';

  const emit = defineEmits(['buyNow']);

  const day = ref<number | string>(0);
  const hours = ref<number | string>(0);
  const minute = ref<number | string>(0);
  const second = ref<number | string>(0);
  const timeOut = ref<number | null>(null);

  onMounted(() => {
    getDateForTimeOut()
  });

  onUnmounted(() => {
    if (timeOut.value) {
      clearTimeout(timeOut.value)
      timeOut.value = null
    }
  })

  const formatDate = (val: number) => {
    return val < 10 ? '0' + val : val
  }

  const initDate = () => {
    let date = new Date()
    day.value = formatDate(date.getDate())
    hours.value = formatDate(date.getHours())
    minute.value = formatDate(date.getMinutes())
    second.value = formatDate(date.getSeconds())
  }
  const getDateForTimeOut = () => {
    initDate()
    timeOut.value = setTimeout(() => {
      getDateForTimeOut()
    }, 1000)
  }
  const buyNow = () => {
    emit('buyNow')
  }
  
</script>