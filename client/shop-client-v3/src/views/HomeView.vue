<script setup lang="ts">
  import { ref } from 'vue';

  const a = ref<number>(45);
</script>

<template>
  <main>
    <div id="top-header">
      <div class="container">
        <ul class="header-links pull-left">
          <li>
            <a href="javascript:;"><i class="fa fa-phone"></i>{{a}}</a>
          </li>
          <li>
            <a href="javascript:;"><i class="fa fa-envelope-o"></i>4545</a>
          </li>
          <li>
            <a href="javascript:;"><i class="fa fa-map-marker"></i>454</a>
          </li>
        </ul>
        <ul class="header-links pull-right">
          <li>
            <a href="javascript:;">
              <i class="fa fa-user-o"></i> 欢迎您 <u>4545</u>
            </a>
          </li>
          <li>
            <a href="javascript:;"><i class="fa fa-user-o"></i> 登录/注册</a>
          </li>
          <li><a href="javascript:;">退出</a></li>
        </ul>
      </div>
    </div>
  </main>
</template>
