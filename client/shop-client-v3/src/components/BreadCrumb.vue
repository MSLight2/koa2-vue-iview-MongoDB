<template>
  <div id="breadcrumb" class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h3 class="breadcrumb-header" v-if="titles.titleTip">{{titles.titleTip}}</h3>
          <ul class="breadcrumb-tree">
            <li
              v-for="(item, index) in titles.titleArr" :key="index">
                <a
                  v-if="titles.titleArr.length - 1 !== index"
                  href="javascript:;"
                  @click="goHome(index)"
                  >{{item}}
                </a>
                <template v-else>{{item}}</template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  defineProps({
    titles: {
      type: Object,
      required: true,
      default: () => (
        {
          titleTip: '',
          titleArr: [],
          path: []
        }
      )
    }
  });

  const goHome = (index: number) => {
    if (index === 0) router.replace({ name: 'home' })
  }
</script>