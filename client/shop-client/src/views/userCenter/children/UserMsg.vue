<template>
  <div>
    <div class="user-header">
      <h3>个人资料</h3>
      <div class="user-btn">
        <Button type="primary" shape="circle" icon="ios-create">编辑</Button>
        <Button type="error" shape="circle" icon="ios-close">注销</Button>
      </div>
      <div class="user-motto">
        <p class="motto">人的一生很短，也很长。世事无常，活在当下，珍惜身边爱你和你所爱。</p>
        <Button type="error" shape="circle" icon="md-brush"></Button>
      </div>
    </div>
    <div class="user-info">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
