<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
@import './style/iconfont/iconfont.css';
@import './style/reset.css';
@import './style/transition.css';
</style>
