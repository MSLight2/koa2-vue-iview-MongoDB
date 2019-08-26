<template>
  <div id="app">
    <header-tmpl v-if="$route.name !== 'userCenter'"></header-tmpl>
    <router-view v-if="$route.meta.nofade"/>
    <transition name="fade" mode="out-in" v-else>
      <router-view/>
    </transition>
  </div>
</template>

<script>
import HeaderTmpl from '@/components/header/HeaderTmpl'

export default {
  name: 'App',
  components: {
    HeaderTmpl
  }
}
</script>

<style>
@import './style/iconfont/iconfont.css';
@import './style/reset.css';
@import './style/transition.css';
</style>
