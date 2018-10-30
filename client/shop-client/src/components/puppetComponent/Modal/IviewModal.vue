<template>
  <div>
    <Modal v-model="modalShow" width="360">
      <p slot="header" class="modal-header">
        <Icon :type="{
          'ios-information-circle color-info': type === 'info',
          'ios-alert color-warning': type === 'warning',
          'ios-checkmark-circle color-success': type === 'success',
          'ios-close-circle color-error': type === 'error'
        }"></Icon>
        <span>{{title}}</span>
      </p>
      <div class="cnt">
        <p>{{content}}</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="close">Delete</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modalShow: false
    }
  },
  props: {
    isShow: {
      type: Boolean,
      require: true,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    type: {
      type: String,
      default: 'warning'
    },
    isShowCancel: {
      type: Boolean,
      default: false
    },
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    content: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>

<style scoped>
  .modal-header{
    color:#f60;
    text-align:center;
  }
  .cnt{
    text-align: center;
  }
  .color-info{
    color: #2db7f5'
  }
  .color-error{
    color: #D10024;
  }
  .color-warning{
    color: #ff9900;
  }
  .color-success{
    color: #19be6b;
  }
</style>
