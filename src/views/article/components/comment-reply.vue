<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- 评论回复列表 -->
    <van-cell title="全部回复" />
    <comment-list type="c" :source="comment.com_id" />
  </div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-list'

export default {
  name: 'CommentReply',

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  components: {
    commentItem,
    commentList
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped></style>
