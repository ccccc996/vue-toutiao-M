<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',

  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {
    async onLike() {
      this.loading = true
      try {
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
        }
      } catch (err) {
        this.$toast.fail('操作失败请稍后重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
