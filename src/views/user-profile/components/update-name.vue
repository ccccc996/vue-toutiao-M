<template>
  <div class="update-name">
    <van-nav-bar
      title="用户昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
    />
    <div class="update-warp">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入用户昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateName',

  data() {
    return {
      message: ''
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.update-warp {
  padding: 20px;
}
</style>
