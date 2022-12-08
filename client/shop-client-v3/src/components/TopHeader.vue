<template>
  <div id="top-header">
    <div class="container">
      <ul class="header-links pull-left">
        <li v-if="dataInfo.phone">
          <a href="javascript:;"><i class="fa fa-phone"></i> {{dataInfo.phone}}</a>
        </li>
        <li v-if="dataInfo.email">
          <a href="javascript:;"><i class="fa fa-envelope-o"></i> {{dataInfo.email}}</a>
        </li>
        <li v-if="dataInfo.address">
          <a href="javascript:;"><i class="fa fa-map-marker"></i> {{dataInfo.address}}</a>
        </li>
      </ul>
      <ul class="header-links pull-right">
        <li v-if="dataInfo.name !== undefined">
          <a href="javascript:;" @click="goUserCenter">
            <i class="fa fa-user-o"></i> 欢迎您 <u>{{dataInfo.nickName || dataInfo.name}}</u>
          </a>
        </li>
        <li v-else>
          <a href="javascript:;" @click="goLogin"><i class="fa fa-user-o"></i> 登录/注册</a>
        </li>
        <li><a href="javascript:;" v-if="dataInfo.name !== undefined" @click="loginOut">退出</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginOut } from '@/api/login'
import LoginStorage from '@/utils/login'
import { Message } from 'view-ui-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  dataInfo: {
    type: Object,
    require: true,
    default: () => {
      return {}
    }
  }
});

function goLogin () {
  router.replace({ name: 'login' })
}
function goUserCenter () {
  router.push({
    name: 'userCenter',
    query: {
      name: 'userMsg'
    }
  })
}
function loginOut () {
  LoginOut().then((res: any) => {
    if (res.isSuccess) {
      LoginStorage.removeLoginStatus()
      LoginStorage.removeToken()
      window.location.reload()
    } else {
      Message.error('退出登出失败！请稍后重试')
    }
  }).catch(() => {
    Message.error('退出登出失败！请稍后重试')
  })
}
</script>