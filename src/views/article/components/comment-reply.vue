<template>
  <div class="comment-reply">
    回复评论
  </div>
</template>

<script>
export default {
  name: 'CommentReply',

  props: {
    comment: {
      type: Object,
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
