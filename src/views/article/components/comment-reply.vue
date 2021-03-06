<template>
  <div class="comment-reply">
    <van-nav-bar title="xx条回复">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
  </div>
</template>

<script>
import commentItem from './comment-item'

export default {
  name: 'CommentReply',

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  components: {
    commentItem
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped></style>
