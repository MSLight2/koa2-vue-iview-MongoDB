<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <!-- <header-tmpl v-if="$route.name !== 'userCenter'"></header-tmpl> -->
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
