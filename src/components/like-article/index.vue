<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1
    }"
    :loading="loading"
  />
</template>

<script>
export default {
  name: 'LikeArticle',

  props: {
    value: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
