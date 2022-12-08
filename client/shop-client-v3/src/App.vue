<script setup lang="ts">
import 'swiper/css';
import { RouterView } from 'vue-router'
import HeaderTmpl from './components/HeaderTmpl.vue'
</script>

<template>
  <div id="app">
    <HeaderTmpl v-if="$route.name !== 'userCenter'"/>
    <router-view v-if="$route.meta.nofade"/>
    <template v-else>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </template>
  </div>
</template>

<style>
  @import './style/iconfont/iconfont.css';
  @import './style/reset.css';
  @import './style/transition.css';
</style>
