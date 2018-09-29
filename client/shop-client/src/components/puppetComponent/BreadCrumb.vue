<template>
  <div id="breadcrumb" class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h3 class="breadcrumb-header" v-if="titles.titleTip">{{titles.titleTip}}</h3>
          <ul class="breadcrumb-tree">
            <li
              v-for="(item, index) in titles.titleArr" :key="index">
                <a href="#" v-if="titles.titleArr.length - 1 !== index">{{item}}</a>
                <template v-else>{{item}}</template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    titles: {
      type: Object,
      require: true,
      default: () => (
        {
          titleTip: '',
          titleArr: [],
          path: []
        }
      )
    }
  }
}
</script>
