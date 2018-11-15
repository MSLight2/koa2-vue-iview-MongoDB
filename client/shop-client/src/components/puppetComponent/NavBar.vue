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

<script>
export default {
  data () {
    return {
      categotyList: ['首页', '电脑', '智能手机', '耳机', '相机', '家电', 'AI智能']
    }
  },
  props: {
    activeCategory: {
      type: Number,
      require: true,
      default: 0
    }
  },
  methods: {
    categotyChange (index) {
      if (index) {
        this.$router.push({
          name: 'store',
          query: { type: index }
        })
      } else {
       this.$router.replace('/') 
      }
    }
  }
}
</script>

<style>
  .navbar-nav a{
    color: #2B2D42
  }
</style>
