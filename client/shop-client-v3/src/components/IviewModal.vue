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
        <Icon :type="iconType" size="22"></Icon>
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

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  const props = defineProps({
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
  });

  const emit = defineEmits(['close'])

  const modalShow = ref<boolean>(false);
  const closeVal = ref<string>('');
  
  const iconType = computed<string>(() => {
    if (props.type === 'info') return 'ios-information-circle color-info'
    if (props.type === 'warning') return 'ios-alert color-warning'
    if (props.type === 'success') return 'ios-checkmark-circle color-success'
    if (props.type === 'error') return 'ios-close-circle color-error'
    return 'ios-alert color-warning'
  })
  const btnType = computed<string>(() => {
    if (!['info', 'warning', 'success', 'error'].some(item => item === props.type)) {
      return 'warning'
    }
    return props.type
  })

  const close = (val: string) => {
    modalShow.value = false
    closeVal.value = val
  }
  const showStatus = (val: boolean) => {
    if (!val) {
      emit('close', closeVal.value)
    } else {
      closeVal.value = 'cancel'
    }
  }

  watch(() => props.isShow, () => {
    modalShow.value = props.isShow;
  })

</script>

<style scoped lang="less">
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
  div :deep(.ivu-modal-header),
  div :deep(.ivu-modal-footer){
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