<template>
  <div class="article-container">文章详情</div>
</template>

<script>
export default {
  name: 'articleIndex',

  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped></style>
