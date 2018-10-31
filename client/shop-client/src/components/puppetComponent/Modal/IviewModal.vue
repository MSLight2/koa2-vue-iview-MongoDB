<template>
  <div class="view-modal">
    <Modal
      v-model="modalShow"
      width="360"
      @on-visible-change="showStatus"
      :mask-closable="false">
      <p slot="header" class="modal-header"
        :class="{
          'color-info': type === 'info',
          'color-warning': type === 'warning',
          'color-success': type === 'success',
          'color-error': type === 'error'
        }">
        <Icon :type="`${iconType}`" size="22"></Icon>
        <span>{{title}}</span>
      </p>
      <div class="cnt">
        <p>{{content}}</p>
      </div>
      <div slot="footer">
        <template v-if="isShowCancel">
          <Button size="large" @click="close('cancel')">{{cancelText}}</Button>
          <Button
            :type="btnType"
            :class="{
              'error': type === 'error',
              'info': type === 'info'
            }"
            size="large"
            @click="close('confirm')">{{sureText}}
          </Button>
        </template>
        <template v-else>
          <Button
            :type="btnType"
            :class="{
              'error': type === 'error',
              'info': type === 'info'
            }"
            size="large" long
            @click="close('confirm')">{{sureText}}
          </Button>
        </template>
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
  },
  computed: {
    iconType () {
      if (this.type === 'info') return 'ios-information-circle color-info'
      if (this.type === 'warning') return 'ios-alert color-warning'
      if (this.type === 'success') return 'ios-checkmark-circle color-success'
      if (this.type === 'error') return 'ios-close-circle color-error'
      return 'ios-alert color-warning'
    },
    btnType () {
      if (!['info', 'warning', 'success', 'error'].some(item => item === this.type)) return 'warning'
      return this.type
    }
  },
  methods: {
    close (val) {
      this.modalShow = false
      this.$emit('close', val)
    },
    showStatus (val) {
      if (!val) this.$emit('close', val)
    }
  },
  watch: {
    isShow () {
      this.modalShow = this.isShow
    }
  }
}
</script>

<style scoped>
  .modal-header{
    color:#f60;
    text-align:center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    border: none;
    font-size: 16px;
  }
  .modal-header i{margin-right: 5px;}
  .cnt{
    font-size: 14px;
  }
  div >>> .ivu-modal-header,
  div >>> .ivu-modal-footer{
    border: none;
  }
  .color-info{
    color: #2d8cf0;
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
  .error.ivu-btn-error{
    background-color: #D10024;
  }
  .info.ivu-btn-info{
    background-color: #2d8cf0;
  }
</style>
