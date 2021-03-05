<template>
  <van-button
    v-if="isFollowed"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'followUser',

  data() {
    return {
      loading: false
    }
  },

  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },

  methods: {
    async onFollow() {
      this.loading = true // 打开关注按钮的 loading
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注，点击关注
          await addFollow(this.userId)
        }
        // 更新关注状态
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭按钮的 loading 状态
    }
  }
}
</script>

<style lang="less" scoped></style>
