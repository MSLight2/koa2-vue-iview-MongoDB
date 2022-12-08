<template>
  <div class="section">
    <div class="container">
      <div class="row">
        <TopSellingWidgetVue
          title="家电"
          :data-list="houseDataArray"
        />
        <TopSellingWidgetVue
          title="像机"
          :swiper-id="2"
          :data-list="cameraDataArray"
        />
        <TopSellingWidgetVue
          title="耳机"
          :swiper-id="3"
          :data-list="phoneDataArray"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TopSellingWidgetVue from './TopSellingWidget.vue';

const props = defineProps({
  houesDataList: {
    type: Array<any>,
    require: true,
    default: () => []
  },
  cameraDataList: {
    type: Array<any>,
    require: true,
    default: () => []
  },
  phoneDataList: {
    type: Array<any>,
    require: true,
    default: () => []
  }
});

const houseDataArray = computed(() => {
  return getSerializeDateList(props.houesDataList)
});
const cameraDataArray = computed(() => {
  return getSerializeDateList(props.cameraDataList)
});
const phoneDataArray = computed(() => {
  return getSerializeDateList(props.phoneDataList)
});

function getSerializeDateList(list: any[]) {
  let tempArray: any[] = [];
  let result: any[] = [];
  list.forEach((item, index) => {
    tempArray.push(item);
    if ((index + 1) % 3 === 0) {
      result.push(tempArray)
      tempArray = [];
    }
  });
  return result;
}
</script>