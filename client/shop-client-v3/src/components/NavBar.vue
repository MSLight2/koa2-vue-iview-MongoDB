<template>
  <nav id="navigation">
    <div class="container">
      <div id="responsive-nav">
        <ul class="main-nav nav navbar-nav">
          <li
            v-for="(item, index) in categotyList"
            :key="index"
            :class="{'active': activeCategory === index}"
            @click="categotyChange(index)">
              <a href="javascript:;">{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  const router = useRouter();

  defineProps({
    activeCategory: { type: Number, required: true, default: 0 }
  });

  const categotyList = ['首页', '电脑', '智能手机', '耳机', '相机', '家电', 'AI智能'];

  function categotyChange (index: number) {
    if (index) {
      router.push({
        name: 'store',
        query: { type: index }
      })
    } else {
      router.replace('/') 
    }
  }
</script>

<style scoped>
  .navbar-nav a{
    color: #2B2D42
  }
</style>
