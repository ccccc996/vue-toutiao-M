<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',

  data() {
    return {
      loading: false
    }
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },

  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏 取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 为收藏 点击收藏
          await addCollect(this.articleId)
        }
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
